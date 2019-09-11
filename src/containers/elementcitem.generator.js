export class ElementCItemGenerator {

    constructor() {
    }
    static getFirstValidCategoryFromItems(datas) {
        if (datas) {
            for(let item of datas){
               
                let parentItemName = item.name;
                if(!item.children) {
                    return item.id;
                }
                
                if(item.children && item.children.length > 0) {
                    for( let citem of item.children)  {
                        return citem.id;
                    }
                }
            };
        }
        return -1;
    }
    static genMakeCategoryItemsDisplayName(datas ,cid) {
        if (datas) {
            for(let item of datas){
               
                let parentItemName = item.name;
                if(item.id === cid) {
                    return item.name;
                }
                
                if(item.children && item.children.length > 0) {
                    for( let citem of item.children)  {
                        if(citem.id === cid) {
                            return `${parentItemName}/${citem.name}`;
                        }
                    }
                }
            };
            return `not found data`;
        }
        return '';
    }
    static genMakeSidebarCategoryItems(datas) {
        let categories = { 
            items: [
            {
                title: true,
                name: '분류',
                class: 'font-lg bg-dark',
                wrapper: {
                    element: '',
                    attributes: {}
                }
            }]
        }
        if (datas) {
            datas.forEach(item => {
               
                let resultItem = {
                    name: item.name,
                    url: `/cqboards/cquestions?div${item.id}=q&cid=${item.id}`,
                    icon: 'icon-doc',
                };
                
                if(item.children && item.children.length > 0) {
                    resultItem.url = 'qboards';
                    resultItem['children'] = [];
                    item.children.forEach( (citem, index) => {
                        let childItem = {
                            name: citem.name,
                            url: `/cqboards/cquestions?div${citem.id}=q&cid=${citem.id}`,
                            icon: 'icon-arrow-right-circle',
                            attributes: {
                               class: 'ml-3'   
                            }
                        }
                        resultItem['children'].push(childItem)
                    });
                }
                categories.items.push(resultItem);
            });
        }
        return categories;
    }
}

export default ElementCItemGenerator;
