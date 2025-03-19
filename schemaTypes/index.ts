import blockContent from './objects/blockContent'
import code from './objects/code'
import socialLinks from './objects/socialLinks'
import resourceCategory from './objects/resourceCategory'
import location from './objects/location'
import contactInfo from './objects/contactInfo'

import activity from './documents/activity'
import member from './documents/member'
import opportunity from './documents/opportunity'
import resource from './documents/resource'
import generalInfo from './documents/generalInfo'
import post from './documents/post'

export const schemaTypes = [
  // Document types
  activity,
  generalInfo,
  member,
  opportunity,
  post,
  resource,

  
  // Object types
  blockContent,
  code,
  contactInfo,
  location, 
  resourceCategory,
  socialLinks,
] 