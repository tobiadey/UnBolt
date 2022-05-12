const Tasks = artifacts.require("Tasks");
const Assets = artifacts.require("Assets");
const Unbolt = artifacts.require("Unbolt");

contract('Tasks', (accounts) => {
    before(async () => {
      this.unbolt = await Tasks.deployed()
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
      const assetCount = await this.unbolt.assetCount()
      const asset = await this.unbolt.assets(assetCount)
      assert.equal(asset.id.toNumber(), assetCount.toNumber())
      assert.equal(asset.assetName, 'Iphone 6')
      assert.equal(asset.completed, false)
      assert.equal(asset.quantity.toNumber(), 6500)
      assert.equal(assetCount.toNumber(), 3)
    })

    //contract has tasks therefore constructor is working and createTasks() is working

    it('Has Tasks', async () => {
        const taskCount = await this.unbolt.taskCount()
        const task = await this.unbolt.tasks(taskCount)
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.content, 'Assemble the plastic')
        assert.equal(task.creator_note, 'Assemble the plastic')
        assert.equal(task.intermediary_note, '')
        assert.equal(task.completed, false)
        assert.equal(task.signator, 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4)
        //none for task.asset
        assert.equal(taskCount.toNumber(), 3)
        })
  
    // createAsset() function working (individual)
    it('creates asset', async () => {
      const result = await this.unbolt.createTask('New Asset',1000)
      const taskCount = await this.unbolt.taskCount()
      assert.equal(taskCount, 4)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), 4)
      assert.equal(event.assetName, 'New Asset')
      assert.equal(event.asset.completed, false)
      assert.equal(event.asset.quantity.toNumber(), 6500)
  })

    // createTask() function working (individual)   
    it('creates task', async () => {
        const result = await this.todoList.createTask("Task Content","my note",3,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4)
        const taskCount = await this.todoList.taskCount()
        assert.equal(taskCount, 4)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 4)
        assert.equal(event.content, 'Task Content')
        assert.equal(event.creator_note, 'my note')
        assert.equal(event.intermediary_note, '')
        assert.equal(event.completed, false)
        assert.equal(event.signator, 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4)
    })
  
    //checks if toggle asset complete works
    it('toggle asset completion', async () => {
        const result = await this.unbolt.toggleAssetCompleted(1)
        const asset = await this.unbolt.assets(1)
        assert.equal(asset.completed, true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
    })

    //checks if toggle task complete works
    it('toggle task completion', async () => {
        const result = await this.unbolt.toggleTaskCompleted(1)
        const task = await this.unbolt.tasks(1)
        assert.equal(task.completed, true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
    })
  
  })