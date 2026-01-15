/**
 * Tilty Template Attributes
 * These attributes govern how data is bound to the HTML.
 */
interface TiltyAttributes {
    /** Binds the innerHTML of the element to the variable */
    'ty-html'?: string;
    /** Binds the innerText of the element to the variable */
    'ty-text'?: string;

    /** Binds distinct attributes */
    'ty-title'?: string;
    'ty-src'?: string; // Automatically handles image resizing if function is used e.g. "img.resize(w,h)"
    'ty-alt'?: string;
    'ty-target'?: string;
    'ty-href'?: string;
    'ty-width'?: string;
    'ty-height'?: string;
    'ty-placeholder'?: string;
    'ty-value'?: string;
    'ty-content'?: string; // <meta content="...">
    'ty-id'?: string;

    /** Boolean attributes (removed if false/null) */
    'ty-checked'?: string;

    /** CSS Classes */
    'ty-class'?: string;      // Replaces the class attribute
    'ty-add-class'?: string;  // Appends to the class attribute

    /** Logic & Control Flow */
    'ty-if'?: string;         // Shows element only if truthy
    'ty-list'?: string;       // Iterates over a list
    'ty-list-item'?: 'ignore' | (string & {}); // "templateName" OR "ignore"
    'ty-scope'?: string;      // Scopes variables to an object

    /** 
     * Escape hatch for other attributes 
     * Syntax: "attribute:variable;attr2:var2"
     * Example: ty-attr="aria-label:myLabel;data-id:id"
     */
    'ty-attr'?: string;

    /** Developer utility to ignore an element during parsing */
    'ty-ignore'?: boolean;
}
