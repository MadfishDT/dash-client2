export class ElementItemGenerator {

    constructor() {
    }
    static genMakeSidebarCategoryItems(datas) {
        let categories = { 
            items: [
            {
                title: true,
                name: 'Categories',
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
                    url: `/qboards/questions?div${item.id}=q&cid=${item.id}`,
                    icon: 'icon-doc'
                };
                
                if(item.children && item.children.length > 0) {
                    resultItem.url = 'qboards';
                    resultItem['children'] = [];
                    item.children.forEach( (citem, index) => {
                        let childItem = {
                            name: citem.name,
                            url: `/qboards/questions?div${citem.id}=q&cid=${citem.id}`,
                            icon: 'icon-arrow-right-circle'
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

export default ElementItemGenerator;
