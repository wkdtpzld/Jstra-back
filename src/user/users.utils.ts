import {Resolver} from "../index";

export const protectResolver = (resolver: Resolver) => (root, args, context, info) => {
    if (!context.user) {
        const isQuery = info.operation.operation === "query";
        if (isQuery) {
            return null
        }
        return {
            ok: false,
            error: "인가되지 않은 행동입니다."
        }
    }
    return resolver(root, args, context, info);
}