import {Room, User} from "@prisma/client";
import UserService from "../../user/Service/userService";
import client from "../../client";

interface ICreateOrFindRoomProps {
    userId?: number;
    roomId?: number;
    user: User
}
class MessageService {

    async createOrFindRoom({roomId, userId, user}: ICreateOrFindRoomProps): Promise<Room | null> {
        let result = null;
        if (userId) {
            await UserService.findUser(userId);
            result = await client.room.create({
                data: {
                    users: {
                        connect: [
                            {
                                id: userId
                            },
                            {
                                id: user.id
                            }
                        ]
                    }
                }
            }) as Room;
            if (!result) {
                throw new Error("해당 유저를 찾지 못하였습니다.");
            }
        }
        if (roomId) {
            result = await client.room.findUnique({
                where: {
                    id: roomId
                },
                select: {
                    id: true
                }
            }) as Room;
            if (!result) {
                throw new Error("해당 룸을 찾지 못하였습니다.");
            }
        }
        return result;
    }
}

export default new MessageService();