import ResponseJson from "../../resources/ResponseData.json";

interface ResponseJsonStruct {
    name: string,
    triggers: string[],
    type: string,
    response: string
}

const ResponseJsonData: ResponseJsonStruct[] = ResponseJson;

export default class ResponseData {
    private static triggerMap: Map<string, ResponseJsonStruct> = new Map();

    public static initialize() {
        ResponseJsonData.forEach(responseData => {
            responseData.triggers.forEach(trigger => {
                this.triggerMap.set(trigger.toLowerCase(), responseData);
            });
        });
    }

    public static getResponse(content: string): ResponseJsonStruct | false {
        for (const [trigger, response] of this.triggerMap.entries()) {
            if (content.toLowerCase().includes(trigger)) {
                return response;
            }
        }
        return false;
    }
}

ResponseData.initialize();
