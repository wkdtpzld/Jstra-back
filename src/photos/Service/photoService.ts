import {Like, Photo, User} from "@prisma/client";
import client from "../../client";

interface ConnectHashtagProps {
    where: any,
    create: any
}

interface ILikeStateUpdateProps {
    like: Like;
    user: User;
    photo: Photo;
    id: number;
}

class PhotoService {
    processHashtags(caption: string): ConnectHashtagProps[] | null {
        if (caption) {
            const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
            return hashtags.map(hashtag => ({where: {hashtag}, create: {hashtag}}));
        } else {
            return null;
        }
    }

    async checkPhoto(id: number): Promise<any> {
        const photo = await client.photo.findUnique({
            where: {
                id,
            },
            select: {
                id: true
            }
        });

        if (!photo) {
            throw new Error("접근 불가능한 영역입니다.")
        }

        return photo;
    }

    async checkPhotoWithHashtag(id: number, user: User) {
        const photo = await client.photo.findFirst({
            where: {
                id,
                userId: user.id,
            },
            include: {
                hashtags: {
                    select: {
                        hashtag: true
                    }
                }
            }
        }) as (Photo & { hashtags: { hashtag: string }[] }) | null;

        if (!photo || photo?.userId !== user.id) {
            throw new Error("접근 불가능한 영역입니다.")
        }
        return photo
    }

    async likeStateUpdate({like, user, photo, id}: ILikeStateUpdateProps) {
        if (like) {
            await client.like.delete({
                where: {
                    photoId_userId: {
                        userId: user.id,
                        photoId: id
                    }
                }
            });
        } else {
            await client.like.create({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    photo: {
                        connect: {
                            id: photo.id
                        }
                    }
                }
            })
        }
    }
}

export default new PhotoService();