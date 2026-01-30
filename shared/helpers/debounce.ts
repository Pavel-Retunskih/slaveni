export function debounceFn<T extends (...args: any[]) => void>(fn: T, delay = 300) {
    let timeout: ReturnType<typeof setTimeout>
    const debounced = (...args: Parameters<T>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => fn(...args), delay)
    }
    debounced.cancel = () => clearTimeout(timeout)
    return debounced
}