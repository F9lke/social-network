import getScriptName from './getScriptName';

const setExcerpt = (text, length, method = 'characters') => {

    if (typeof text === 'string' && text.trim().length > 0) {

        switch (method) {
            case 'characters':

                var excerpt = text.trim().substring(0, length) + " ...";
                excerpt = excerpt.substr(0, Math.min(excerpt.length, excerpt.lastIndexOf(" ")))
                return excerpt;

                break;
            case 'words':

                // use str.split(" ")

                break;
            default:
                throw new Error(`Void was given to param 'method' in function ${arguments.callee.name} in ${getScriptName()}`);
        }

    } else if (typeof text === 'object' && Object.keys(text).length > 0) {

        throw new Error("Can't create an excerpt from an object.");

    } else if (typeof text === 'string' && text.trim().length === 0) {

        throw new Error(`Void was given to function ${arguments.callee.name} in ${getScriptName()}`)

    }
}

export default setExcerpt;