class Castaway  {

    constructor(scene) {
        this.direction = -1
        var unit = .1
        var baseCube = new THREE.BoxGeometry(unit, unit, unit)
        this.bodyMaterial = new THREE.MeshBasicMaterial({color: 0xc68642})
        this.pantsMaterial = new THREE.MeshBasicMaterial({color: 0x990000})

        var cubea = new THREE.Mesh(baseCube, this.pantsMaterial)

        /* foot modeling */
        this.pAnkle = new THREE.Object3D() //ankle pivot
        var gFoot = new THREE.BoxGeometry(unit*4, unit*2, unit*6)
        var gAnkle = new THREE.BoxGeometry(unit*4, unit, unit*4)

        var foot = new THREE.Mesh(gFoot, this.bodyMaterial)
        var ankle = new THREE.Mesh(gAnkle, this.bodyMaterial)

        foot.position.y = unit*-1
        foot.position.z = unit*1

        this.pAnkle.add(foot)
        this.pAnkle.add(ankle)

        /* lower leg modeling */
        this.pKnee = new THREE.Object3D() //knee pivot
        var gLowerLeg = new THREE.BoxGeometry(unit*2, unit*8, unit*2)
        var gKnee = new THREE.BoxGeometry(unit*4, unit*2, unit*4)

        var lowerLeg = new THREE.Mesh(gLowerLeg, this.bodyMaterial)
        var knee = new THREE.Mesh(gKnee, this.bodyMaterial)

        lowerLeg.position.y = unit*-4

        this.pKnee.add(lowerLeg)
        this.pKnee.add(knee)

        this.pAnkle.position.y = unit*-8
        this.pKnee.add(this.pAnkle)

        /*
		//var texture = THREE.ImageUtils.loadTexture('textures/11635.jpg');
        //var material = new THREE.MeshPhongMaterial( { map: texture } );
        var material = new THREE.MeshBasicMaterial({color: 0x444444})
        var cube = new THREE.Mesh( geometry, material );
        this.aCube = new THREE.Mesh( geometry, material );
        this.aCube.position.x = 5
        */

        this.mainPivot = new THREE.Object3D()

        this.pKnee.position.y = unit*5
        this.mainPivot.add(this.pKnee)

        scene.add(this.mainPivot)
    }

    update() {
        this.mainPivot.rotation.y += 1*Math.PI/180 

        this.pKnee.rotation.x += -1*Math.PI/180 

        
        if(this.pAnkle.rotation.x < -30*Math.PI/180) {
            this.direction = 1
        } 


        if(this.pAnkle.rotation.x > 20*Math.PI/180) {
            this.direction = -1
        } 

        this.pAnkle.rotation.x += this.direction*Math.PI/180 
        
            
    }

    /* pivoting */
    /*
    let newPetal = mPetal.clone()
    let pivot = new THREE.Object3D()
    pivot.rotation.y = angle*rad
    pivot.add(newPetal)
    scene.add(pivot)
    */
}