import * as _ from 'lodash';

export class ItemDetail {
    name: string;
    description: string;
    mark_price: number;
    sale_price: number;
    sale_msg: string;
    colors: Array<any>;
    sizes: Array<any>;
    showData: any;


    fromJSONObject(obj, selectedOptions?) {
        this.colors = this.colorOrSize(obj.attributes[1]._id, obj.options);
        this.sizes = this.colorOrSize(obj.attributes[0]._id, obj.options);
        this.showData = this.findMatchArray(obj, selectedOptions ? selectedOptions : '');
        this.description = _.get(obj.primary_product, 'desc');
        return this;
    }

    colorOrSize(id, options) {
        let dataArray = []
        _.forEach(options, (data) => {
            if (data.attrib_id == id) {
                dataArray.push(data);
            }
        });
        return dataArray;
    }

    findMatchArray(obj, selectedOptions?) {
        for (let i = 0; i < obj.product_variations.length; i++) {
            var equal = _.intersectionWith(obj.product_variations[i].sign, selectedOptions ? selectedOptions : obj.selected_option_ids, _.isEqual);
            if (equal.length == 2) {
                return obj.product_variations[i];
            }
        }
    }
}