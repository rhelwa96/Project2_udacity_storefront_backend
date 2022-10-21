import   Product_Model  from '../../models/product.models'

const p_model = new Product_Model()

describe('product Model', () => {
    it('create product', async () => {
        const product = await p_model.create({   
            product_name: 'flower',
            product_description: 'Lovel Flower',
            product_link: 'http:/pro.com',
            product_price: 20,
            product_category: 'Orchid',
        })
        expect(product.product_name).toEqual('flower')
    })

    it('update product', async () => {
        const products = await p_model.RetrieveAll()
        const productId = products[0].id

        const product = await p_model.updateSingle({
            id: productId,
            product_name: 'red rose',
            product_description: 'blouse of roses',
            product_link: 'http:/pro2.com',
            product_price: 50,
            product_category: 'Orchid-2',
        })
        expect(product.product_name).toEqual('red rose')
    })

    it('list of products', async () => {
        const product = await p_model.RetrieveAll()
        expect(product.length).toEqual(1)
    })

    it('return selected product', async () => {
        const products = await p_model.RetrieveAll()
        const productId = products[0].id as string

        const product = await p_model.RetrieveSingle(productId)
        expect(product.product_name).toEqual('red rose')
    })

    it(' delete the product', async () => {
        let products = await p_model.RetrieveAll()
        const productId = products[0].id as string

        await p_model.deleteSingle(productId)
        products = await p_model.RetrieveAll()

        expect(products.length).toEqual(0)
    })
})