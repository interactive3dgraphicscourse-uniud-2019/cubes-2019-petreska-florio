/** Class representing a castaway */
class Castaway  {
    /**
     * Create a castaway
     * @param {THREE.Scene} scene 
     */
    constructor(scene) {
        this.walking = false
        this.ankleDirection = -1 //rendering option
        this.kneeDirection = 1 //rendering option
        this.hipDirection = -1 //rendering option
        
        var unit = .1 // dimensions of one basic cube
        this.bodyMaterial = new THREE.MeshBasicMaterial({color: 0xc68642}) // material for the skin
        this.pantsMaterial = new THREE.MeshBasicMaterial({color: 0x990000}) // material for pants

        /* mainPivot will decide the position of the character in the scene
        it will always be centered between feet and at sole level to 
        easily snap the character onto the floor */
        this.mainPivot = new THREE.Object3D() 

        /* foot modeling snippet*/
        var ankleGroup = Castaway.generateJointAndBone(unit, this.bodyMaterial, 4, 1, 4, this.bodyMaterial, 4, 2, 6)

        ankleGroup.bone.position.y = unit*-1 // positioning foot in height 
        ankleGroup.bone.position.z = unit*1 // positioning foot in depth

        this.pAnkle = ankleGroup.pivot // ankle pivot - used to move ankle (class variable)

        
        /* leg modeling */
        /* lower leg modeling snippet */
        var lowerLegGroup = Castaway.generateJointAndBone(unit, this.bodyMaterial, 4, 2, 4, this.bodyMaterial, 2, 8, 2)
        
        lowerLegGroup.bone.position.y = unit*-4 // positioning lower leg bone
        
        this.pKnee = lowerLegGroup.pivot // knee pivot - used to move knee (class variable)

        this.pAnkle.position.y = unit*-8 // positioning ankle relative to knee
        this.pKnee.add(this.pAnkle) // foot depends on knee (move the knee --> move the foot)       
        
        /* upper leg modeling snippet */
        var upperLegGroup = Castaway.generateJointAndBone(unit, this.pantsMaterial, 4, 4, 4, this.bodyMaterial, 2, 8, 2)

        upperLegGroup.bone.position.y = unit*-4 // positioning upper leg bone

        var leg = upperLegGroup.pivot // leg group

        this.pKnee.position.y = unit*-8 // positioning lower leg relative to upper leg
        leg.add(this.pKnee) // knee and ankle depend on hip (move hip --> move knee --> move foot)

        leg.position.y = unit*-1 // positioning leg relative to actual pivot of the hip
        leg.position.z = unit*-1

        this.pHipR = new THREE.Object3D() // leg pivot - used to move hip
        this.pHipR.add(leg) // entire leg movement depends on this new pivot

        this.pHipR.position.y = unit*14 // positioning leg relative to terrain (sole touches the floor)
        this.pHipR.position.x = unit*-3


         /* duplicate leg */
        this.pHipL = this.pHipR.clone()

        this.pHipL.position.x = unit*3 // positioning leg mirrored on x axis

        this.pKneeL = this.pHipL.children[0].children[2]

        this.pAnkleL = this.pKneeL.children[2]

        console.log(this.pKneeL)
        
        this.mainPivot.add(this.pHipR) // mainPivot gains control of legs 
        this.mainPivot.add(this.pHipL)

        
        /* arm modeling */
        /* hand modeling snippet */
        var handGroup = Castaway.generateJointAndBone(unit, this.bodyMaterial, 2, 2, 2, this.bodyMaterial, 4, 1, 2)

        handGroup.bone.position.x = unit*-2 // positioning hand relative to wrist pivot

        var thumb =  new THREE.Mesh(new THREE.BoxGeometry(unit*1, unit*1, unit*1), this.bodyMaterial) //generate box for thumb

        thumb.position.x = unit*-1 // positioning thumb relative to wrist pivot
        thumb.position.z = unit*1.5
        
        this.pHand = handGroup.pivot // wrist pivot - moving the hand

        this.pHand.add(thumb) // add thumb to wrist pivot

        /* lower arm */
        var lowerArmGroup = Castaway.generateJointAndBone(unit, this.bodyMaterial, 2, 4, 4, this.bodyMaterial, 4, 2, 2)

        lowerArmGroup.bone.position.x = unit*-2 // positioning lower arm bone relative to elbow

        this.pElbow = lowerArmGroup.pivot // elbow pivot - moving lower arm

        this.pHand.position.x = unit*-5 // positioning hand relative to elbow pivot

        this.pElbow.add(this.pHand) // hand pivot is child of elbow pivot

        /* upper arm */
        var upperArmGroup = Castaway.generateJointAndBone(unit, this.bodyMaterial, 4, 4, 4, this.bodyMaterial, 4, 2, 2)

        upperArmGroup.bone.position.x = unit*-4 // positioning upper arm bone relative to shoulder

        var arm = upperArmGroup.pivot // arm container

        this.pElbow.position.x = unit*-7 // positioning lower arm relative to shoulder pivot

        this.pShoulder = new THREE.Object3D() // shoulder pivot - moving lower arm 
        arm.add(this.pElbow)   // lower arm is part of arm 

        arm.position.x = unit*-2
        arm.position.y = unit*2

        this.pShoulder.add(arm) // arm is child of shoulder pivot (move shoulder -> move elbow -> move wrist)


        /* add arm to body */
        this.pShoulder.position.y = unit*21
        this.pShoulder.position.x = unit*-4
        this.pShoulder.position.z = unit*-2.5

        this.mainPivot.add(this.pShoulder)
        

        /* body modeling */
        var gBodyLower = new THREE.BoxGeometry(unit*10, unit*4, unit*5)
        var gBodyUpper = new THREE.BoxGeometry(unit*10, unit*6, unit*5)

        var bodyUpper = new THREE.Mesh(gBodyUpper, this.bodyMaterial)
        var bodyLower = new THREE.Mesh(gBodyLower, this.pantsMaterial)
        
        bodyLower.position.y = unit*15
        bodyLower.position.z = unit*-1.5
        
        bodyUpper.position.y = unit*20
        bodyUpper.position.z = unit*-1.5

        this.mainPivot.add(bodyLower)
        this.mainPivot.add(bodyUpper)


        scene.add(this.mainPivot)

    }

    /**
     * utility method to create a pair joint and bone with 
     * pivot set on joint
     * @param {Number} unit - standard
     * @param {THREE.Material} jMaterial - material of joint box
     * @param {Number} jx - width of joint box
     * @param {Number} jy - height of joint box
     * @param {Number} jz - depth of joint box
     * @param {THREE.Material} bMaterial - material of bone box
     * @param {Number} bx - width of bone box
     * @param {Number} by - height of bone box
     * @param {Number} bz - depth of bone box
     * @returns {Object} object containing joint and bone meshes and pivot object3D
     */
    static generateJointAndBone(unit, jMaterial, jx, jy, jz, bMaterial, bx, by, bz) {
        var pJoint = new THREE.Object3D() //joint pivot

        var gBone = new THREE.BoxGeometry(unit*bx, unit*by, unit*bz) // create boxes
        var gjoint = new THREE.BoxGeometry(unit*jx, unit*jy, unit*jz)

        var bone = new THREE.Mesh(gBone, bMaterial) // create meshes
        var joint = new THREE.Mesh(gjoint, jMaterial)

        pJoint.add(bone) // ad meshes to pivot
        pJoint.add(joint)

        /* objext contains joint, bone and pivot objects
           they can be partially modified in the return context */
        var jointAndBone = {
            joint: joint,
            bone: bone,
            pivot: pJoint
        }
      
        return jointAndBone
    }
    
    /* @TODO more natural animation */ 
    walkAnimation() {
        if(this.pHipR.rotation.x < -30*Math.PI/180) {
            this.hipDirection = 1
        } 


        if(this.pHipR.rotation.x > 30*Math.PI/180) {
            this.hipDirection = -1
        } 

        if(this.pKnee.rotation.x < 0) {
            this.kneeDirection = 1
        } 
        if(this.pKnee.rotation.x > 20*Math.PI/180) {
            this.kneeDirection = -1
        }  
        
        /* if(this.pAnkle.rotation.x  < -25*Math.PI/180) {
            this.ankleDirection = 1
        } 


        if(this.pAnkle.rotation.x > 40*Math.PI/180) {
            this.ankleDirection = -1
        } */

         
        //this.pAnkle.rotation.x += this.ankleDirection*Math.PI/180 
        this.pKneeR.rotation.x += this.kneeDirection*Math.PI/180
        this.pHipR.rotation.z += this.hipDirection*Math.PI/180

        //this.pAnkleL.rotation.x += this.ankleDirection*Math.PI/180 
        this.pKneeL.rotation.x += this.kneeDirection*Math.PI/180 
        this.pHipL.rotation.x += this.hipDirection*-1*Math.PI/180

    }

    /**
     * update position of the castaway
     */
    update() {
       if(this.walking) {
            this.walkAnimation()
            this.mainPivot.position.z+=.01
        }
    }
}