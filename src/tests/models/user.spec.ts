import   User_Model  from '../../models/user.models'

const u_model = new User_Model()

describe('User Model', () => {
    it('create user', async () => {
        const user = await u_model.create({   
            first_name: 'Barry',
            last_name: 'Allen',
            username: 'flash',
            password_digest: 'barry123',
            email: 'email@flash.com',
        })
        expect(user.username).toEqual('flash')
    })

    it('update user', async () => {
        const users = await u_model.RetrieveAll()
        const userId = users[0].id

        const user = await u_model.updateSingle({
            id: userId,
            username: 'flasjteam',
            first_name: 'barry',
            last_name: 'allen',
            password_digest: 'password123',
            email: 'email@ggg.com',
        })
        expect(user.username).toEqual('flasjteam')
    })

    it('list of users', async () => {
        const user = await u_model.RetrieveAll()
        expect(user.length).toEqual(1)
    })

    it('return selected user', async () => {
        const users = await u_model.RetrieveAll()
        const userId = users[0].id as string

        const user = await u_model.RetrieveSingle(userId)
        expect(user.username).toEqual('flasjteam')
    })

    it('should delete the user', async () => {
        let users = await u_model.RetrieveAll()
        const userId = users[0].id as string

        await u_model.deleteSingle(userId)
        users = await u_model.RetrieveAll()

        expect(users.length).toEqual(0)
    })
})