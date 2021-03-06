/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMSVGDeprecatedAttributeDevtool
 */

'use strict';

var DOMProperty = require('./DOMProperty');

var warning = require('fbjs/lib/warning');

if (process.env.NODE_ENV !== 'production') {
  var reactProps = {
    children: true,
    dangerouslySetInnerHTML: true,
    key: true,
    ref: true
  };
  var warnedSVGAttributes = {};

  var warnDeprecatedSVGAttribute = function (name) {
    if (!DOMProperty.properties.hasOwnProperty(name)) {
      return;
    }

    if (reactProps.hasOwnProperty(name) && reactProps[name] || warnedSVGAttributes.hasOwnProperty(name) && warnedSVGAttributes[name]) {
      return;
    }

    var _DOMProperty$properties$name = DOMProperty.properties[name];
    var attributeName = _DOMProperty$properties$name.attributeName;
    var attributeNamespace = _DOMProperty$properties$name.attributeNamespace;

    if (attributeNamespace || name === attributeName) {
      return;
    }

    process.env.NODE_ENV !== 'production' ? warning(false, 'SVG property %s is deprecated. Use the original attribute name ' + '%s for SVG tags instead.', name, attributeName) : undefined;
  };
}

var ReactDOMSVGDeprecatedAttributeDevtool = {
  onCreateMarkupForSVGAttribute: function (name, value) {
    warnDeprecatedSVGAttribute(name);
  },
  onSetValueForSVGAttribute: function (node, name, value) {
    warnDeprecatedSVGAttribute(name);
  }
};

module.exports = ReactDOMSVGDeprecatedAttributeDevtool;