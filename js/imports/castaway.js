class Castaway  {

    constructor(scene) {
        this.direction = -1 //rendering option
        this.kDirection = 1 //rendering option
        this.hDirection = -1

        var unit = .1
        var baseCube = new THREE.BoxGeometry(unit, unit, unit)
        this.bodyMaterial = new THREE.MeshBasicMaterial({color: 0xc68642})
        this.pantsMaterial = new THREE.MeshBasicMaterial({color: 0x990000})

        var cubea = new THREE.Mesh(baseCube, this.pantsMaterial)

        /* foot modeling */
        var ankleGroup = this.generateJointAndBone(unit, this.bodyMaterial, 4, 1, 4, this.bodyMaterial, 4, 2, 6)

        ankleGroup.bone.position.y = unit*-1
        ankleGroup.bone.position.z = unit*1

        this.pAnkle = ankleGroup.pivot

        

        /* lower leg modeling */

        var lowerLegGroup = this.generateJointAndBone(unit, this.bodyMaterial, 4, 2, 4, this.bodyMaterial, 2, 8, 2)

        lowerLegGroup.bone.position.y = unit*-4

        this.pKnee = lowerLegGroup.pivot

        this.pAnkle.position.y = unit*-8

        this.pKnee.add(this.pAnkle)

        
        
        /* upper leg modeling */

        var upperLegGroup = this.generateJointAndBone(unit, this.bodyMaterial, 4, 4, 4, this.bodyMaterial, 2, 8, 2)

        upperLegGroup.bone.position.y = unit*-4

        this.pHipR = upperLegGroup.pivot

        this.pKnee.position.y = unit*-8

        this.pHipR.add(this.pKnee)


        /* duplicate leg */

        

         

        /*
		//var texture = THREE.ImageUtils.loadTexture('textures/11635.jpg');
        //var material = new THREE.MeshPhongMaterial( { map: texture } );
        var material = new THREE.MeshBasicMaterial({color: 0x444444})
        var cube = new THREE.Mesh( geometry, material );
        this.aCube = new THREE.Mesh( geometry, material );
        this.aCube.position.x = 5
        */

        this.mainPivot = new THREE.Object3D()

        this.pHipR.position.y = unit*13
        this.pHipR.position.x = unit*-4

        this.pHipL = this.pHipR.clone()

        this.pHipL.position.x = unit*4

        this.mainPivot.add(this.pHipR)
        this.mainPivot.add(this.pHipL)

        scene.add(this.mainPivot)
    }

    generateJointAndBone(unit, jMaterial, jx, jy, jz, bMaterial, bx, by, bz) {
        var pJoint = new THREE.Object3D() //joint pivot
        var gBone = new THREE.BoxGeometry(unit*bx, unit*by, unit*bz)
        var gjoint = new THREE.BoxGeometry(unit*jx, unit*jy, unit*jz)

        var bone = new THREE.Mesh(gBone, bMaterial)
        var joint = new THREE.Mesh(gjoint, jMaterial)

        pJoint.add(bone)
        pJoint.add(joint)

        var jointAndBone = {
            joint: joint,
            bone: bone,
            pivot: pJoint
        }
      
        return jointAndBone
    }

    update() {
        //this.mainPivot.rotation.y += 1*Math.PI/180 

        
        if(this.pHipR.rotation.x < -110*Math.PI/180) {
            this.hDirection = 1
        } 


        if(this.pHipR.rotation.x > 90*Math.PI/180) {
            this.hDirection = -1
        } 

        if(this.pKnee.rotation.x < 0) {
            this.kDirection = 1
        } 


        if(this.pKnee.rotation.x > 90*Math.PI/180) {
            this.kDirection = -1
        } 
        
        if(this.pAnkle.rotation.x  < -30*Math.PI/180) {
            this.direction = 1
        } 


        if(this.pAnkle.rotation.x > 20*Math.PI/180) {
            this.direction = -1
        } 

        this.pKnee.rotation.x += this.kDirection*Math.PI/180 
        this.pAnkle.rotation.x += this.direction*Math.PI/180 
        this.pHipR.rotation.x += this.hDirection*Math.PI/180
        
            
    }
}