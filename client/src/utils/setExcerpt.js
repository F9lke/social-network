import getScriptName from "./getScriptName";

const setExcerpt = (text, length, method = "characters") => {
    if (typeof text === "string" && text.trim().length > 0) {
        switch (method) {
            case "characters":
                let excerpt = text.trim().substring(0, length) + " ...";
                excerpt = excerpt.substr(
                    0,
                    Math.min(excerpt.length, excerpt.lastIndexOf(" "))
                );
                return excerpt;

            case "words":
                let returnValue = text
                    .trim()
                    .split(" ")
                    .slice(0, length)
                    .join(" ");
                const lastElement = text
                    .trim()
                    .split("")
                    .slice(-1)[0];

                if (lastElement === ".") {
                    returnValue += "..";
                } else {
                    returnValue += " ...";
                }

                return returnValue;

            default:
                throw new Error(
                    `Void was given to param 'method' in function ${
                        arguments.callee.name
                    } in ${getScriptName()}`
                );
        }
    } else if (typeof text === "object" && Object.keys(text).length > 0) {
        throw new Error("Can't create an excerpt from an object.");
    } else if (typeof text === "string" && text.trim().length === 0) {
        throw new Error(
            `Void was given to function ${
                arguments.callee.name
            } in ${getScriptName()}`
        );
    }
};

export default setExcerpt;
