export default (langCode: string) => {
    return require('./'+langCode)
}