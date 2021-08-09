const roleToRoute = {
    coustomer: [{
        name: 'Product'
    }, {
        name: 'ProductList'
    }, {
        name: 'ProductAdd'
    },{
        name: 'Productedit'
    }],
    admin: [
        {
            name: 'Product'
        }, {
            name: 'ProductList'
        }, {
            name: 'ProductAdd'
        },
        {
            name: 'CateGory'
        },
        {
            name: 'Productedit'
        }
    ]

}
export default function getMenuRoute(routes, role) {//根据当前符合的数据，找到对应的数据
    const allName = roleToRoute[role].map(element => {
        
        return element.name;
    });
   
    const arrs = routes.filter(ele => {//ele代表每项对象
       
        if (allName.indexOf(ele.name) !== -1) {
            ele.children = ele.children.filter(r => {
               
                return allName.indexOf(r.name) !== -1;
            })

            return true;
        }
        return false;
    })

    return arrs;

}