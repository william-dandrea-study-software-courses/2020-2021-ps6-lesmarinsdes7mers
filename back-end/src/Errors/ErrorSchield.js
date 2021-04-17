export function Execute(res, action) {
    try {
        action()
    } catch (error) {
        if(error.send) error.send(res)
        else {
            console.error(error)
            res.sendStatus(500)
        }
    }
}
