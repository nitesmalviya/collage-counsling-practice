export type AnyType<T> = T | undefined | null | void | [];

export interface ErrorPropsType {
    error: Error & { digest?: string }
    reset: () => void
}