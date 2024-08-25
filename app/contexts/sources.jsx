
import { createContext, useContext } from "react";

export const SourceContext = createContext({
    sources: {categories:"", country:"", language:"", search:""},
    article: {},
    setData: () => {},

});
export const SourceProvider = SourceContext.Provider
export default function useSource() {
    return useContext(SourceContext)
}