export class ArrayUtils {
    /**
     * Remove all duplicate objects in a given array with the same property value.
     * @param array
     * @param property
     */
    static makeArrayUnique<T>(array: T[], property: any): T[] {
        return array.filter(
            (value: any, index: number) =>
                index ===
                array.findIndex(
                    (element: any) => element[property] === value[property]
                )
        );
    }
}
