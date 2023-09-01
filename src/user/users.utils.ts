
export const protectResolver = (resolver) => (root, args, context, info) => {
    if (!context.user) {
        return {
            ok: false,
            error: "로그인 되지 않은 상태입니다. 상태를 확인해주세요."
        }
    }
    return resolver(root, args, context, info);
}