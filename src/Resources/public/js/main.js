'use strict';

define(
    [
        'underscore',
        'pim/form',
        'routing',
        'koempf-show-attribute-codes/link-template',
        'koempf-show-attribute-codes/attribute-code-template',
    ],
    function (
        _,
        BaseForm,
        Routing,
        linkTemplate,
        attributeCodeTemplate
    ) {
        return BaseForm.extend({
            linkTemplate: _.template(linkTemplate),
            attributeCodeTemplate: _.template(attributeCodeTemplate),

            tagName: 'button',

            className: 'AknDropdown-menuLink koempf-show-attribute-codes',

            events: {
                'click': 'showAttributeCodes'
            },

            render: function () {
                this.$el.html(this.linkTemplate('Attribute-Codes anzeigen'));
                this.delegateEvents();

                return this;
            },

            showAttributeCodes: function () {
                let self = this;
                jQuery('[data-attribute]').each(function () {
                    let $attributeField = jQuery(this),
                        attributeCode = $attributeField.data('attribute');

                    if ($attributeField.find('.koempf-attribute-link').length > 0) {
                        return;
                    }

                    $attributeField.find('.AknFieldContainer-label').append(
                        self.attributeCodeTemplate({
                            link: self.getAttributeLink(attributeCode),
                            attributeCode: attributeCode
                        })
                    );
                });
            },

            getAttributeLink: function (attributeCode) {
                return '/#' + Routing.generate(
                    'pim_enrich_attribute_edit',
                    {
                        code: attributeCode
                    }
                );
            },
        });
    }
);
