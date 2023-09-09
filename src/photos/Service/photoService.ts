import {Photo, User} from "@prisma/client";
import client from "../../client";

interface ConnectHashtagProps {
    where: any,
    create: any
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

    async checkPhoto(id: Number, user: User) {
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
}

export default new PhotoService();