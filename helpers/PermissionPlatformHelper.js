import {ALL_PLATFORM_BASE_OBJECT} from "~/constant/general/GeneralConstant.js";

const getPlatformById = (platformId) => {
    for (const platformKey in ALL_PLATFORM_BASE_OBJECT) {
        const platform = ALL_PLATFORM_BASE_OBJECT[platformKey]
        if (platform.platform_id === Number(platformId)) {
            return platform
        }
    }
    return null;
}

const getPlatformByName = (name) => {
    for (const platformKey in ALL_PLATFORM_BASE_OBJECT) {
        const platform = ALL_PLATFORM_BASE_OBJECT[platformKey]
        if (platform.uniqueName === name) {
            return platform
        }
    }
    return null;
}

export {
    getPlatformByName,
    getPlatformById
}