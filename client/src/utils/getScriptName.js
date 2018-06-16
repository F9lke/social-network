const getScriptName = () => {
    var error = new Error(),
        source,
        lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/),
        currentStackFrameRegex = new RegExp(
            /getScriptName \(.+\/(.*):\d+:\d+\)/
        );

    if (
        (source = lastStackFrameRegex.exec(error.stack.trim())) &&
        source[1] !== ""
    )
        return source[1];
    else if ((source = currentStackFrameRegex.exec(error.stack.trim())))
        return source[1];
    else if (error.fileName !== undefined) return error.fileName;
};

export default getScriptName;
