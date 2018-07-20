import getDisplayName from 'recompose/getDisplayName'


type Mods = {[key: string]: boolean | string | null | void}


const BEM  = {child:'__', mod:'--', modValue:'-'}
const SUIT = {child:'-',  mod:'--', modValue:'-'}

// TODO: some way to make these configurable
const separators = SUIT


/**
 * Attaches mods onto a block.
 * @returns {string} The class string of the block w/ any active mods
 * @param {string} componentName - The name of the block
 * @param {Mods} mods - A map of mods. Each key is a mod name, and each value
 * can be either a boolean (resulting in 'Component--mod') or a string value
 * (resulting in 'Component--mod-value')
 */
function withMods(componentName: string, mods: Mods): string {
  let cls = ''
  for (let key in mods) {
    if (mods.hasOwnProperty(key)) {
      let val = mods[key]
      let mod: string = ''

      if ((val == null) || (val === false)) {
        continue
      } else if (typeof val == 'boolean') {
        mod = key
      } else {
        mod = `${key}${separators.modValue}${val.toString()}`
      }
      cls += (`${componentName}${separators.mod}${mod} `)
    }
  }
  return cls
}


/**
 * @description Forms a class string for a child element
 * @returns The class string of the child element
 * 
 * @param {string} componentName - The block name
 * @param {string} child - The child element name
 */
function withChild(componentName: string, child: string): string {
  return `${componentName}${separators.child}${child}`
}


/**
 * @description Forms a valid class string for the given block,
 * element, and mods. If only elem is included, returns 'Component__elem'.
 * If only mods, returns 'Component--mod ...'. If both are included, returns
 * 'Component__elem--mod ...'
 * @returns The valid BEM/SUIT class string
 * 
 * @param {string} component - Either a string name or a Component
 * @param {string} [elem] - The sub-element name
 * @param {Mods} [mods] - A map of mods
 */
export default function className(
  component: string | React.Component,
  elem?: string | Mods | null | void,
  mods?: Mods | null | void
): string {
  const cname = (typeof component == 'string'
    ? component
    : getDisplayName(component.constructor as React.ComponentClass)
  )

  if (elem && (typeof elem != 'string')) {
    mods = elem
    elem = null
  }

  if ((elem != null) && (mods == null)) {
    return withChild(cname, elem)
  } else if ((elem == null) && (mods != null)) {
    return `${cname} ${withMods(cname, mods)}`
  } else if ((elem != null) && (mods != null)) {
    return `${withChild(cname, elem)} ${withMods(withChild(cname, elem), mods)}`
  } else {
    return cname
  }
}
