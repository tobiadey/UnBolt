const Unbolt = artifacts.require("Unbolt");

contract('UNBOLT', (accounts) => {
    before(async () => {
      this.unbolt = await Unbolt.deployed()
    })
  
    //contract is deployed as it has an address value that is not null/ 0x00000000000...
    it('Deploys Succesfully', async () => {
      const address = await this.unbolt.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  
    //contract has assets therefore constructor is working and createAssets() is working
    it('Has Assets', async () => {
      const asset = await this.unbolt.assets(0)
      assert.equal(asset.id.toNumber(), 1)
      assert.equal(asset.assetName, "Berken Bag")
      assert.equal(asset.description, "Pink Bag")
      assert.equal(asset.completed, false)
      assert.equal(asset.quantity.toNumber(), 1000)
    })

  //   //contract has tasks therefore constructor is working and createTasks() is working
    it('Has Tasks', async () => {
        const task = await this.unbolt.tasks(0)
        assert.equal(task.id.toNumber(), 1)
        assert.equal(task.content, 'Source Leather')
        assert.equal(task.creator_note, 'Make sure it is the best quality mushroom leather')
        assert.equal(task.completed, false)
        assert.equal(task.signator, 0x25e86d826d5ccAc2D45Df42c942f8258b143B273)
        })
  
    // createAsset() function working (individual)
    it('creates asset', async () => {
      const result = await this.unbolt.createAsset("New Asset","Desc",1000)
      const event = result.logs[0].args
      //skip decoded index
      assert.equal(event._description, "Desc")
      assert.equal(event.completed, false)
      assert.equal(event._quantity.toNumber(), 1000)
  })

    // createTask() function working (individual)   
    it('creates task', async () => {
        const result = await this.unbolt.createTask("Task Content","my note",3,"0x25e86d826d5ccAc2D45Df42c942f8258b143B273")
        const event = result.logs[0].args
        //skip decoded index
        assert.equal(event.who, 0x25e86d826d5ccAc2D45Df42c942f8258b143B273)
    })
  
    //checks if toggle asset complete works
    it('toggle asset completion', async () => {
        const asset = await this.unbolt.assets(0)
        const oldValue = asset.completed
        const result = await this.unbolt.toggleAssetCompleted(1)
        const event = result.logs[0].args
        assert.notEqual(event.newValue, oldValue)
    })

  //   //checks if toggle task complete works
    it('toggle task completion', async () => {
        const task = await this.unbolt.tasks(0)
        const oldValue = task.completed
        const result = await this.unbolt.toggleTaskCompleted(1)
        const event = result.logs[0].args
        assert.notEqual(event.completed, oldValue)
    })

      //   //checks if toggle task complete works
      it('description added', async () => {
        const result = await this.unbolt.addDescription(3, 'new desc')
        const event = result.logs[0].args
        assert.equal(event.who, 0x25e86d826d5ccAc2D45Df42c942f8258b143B273)
        assert.equal(event.signator, 0x25e86d826d5ccAc2D45Df42c942f8258b143B273)
    })


  
  })