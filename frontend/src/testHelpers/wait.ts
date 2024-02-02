const wait = async (): Promise<void> => {
    return new Promise<void>((resolve)=> {
        setTimeout(() => resolve(), 0)
    });
}

export default wait;