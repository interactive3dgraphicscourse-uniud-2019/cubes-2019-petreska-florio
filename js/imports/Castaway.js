/** Class representing a castaway */
class Castaway  {
    /**
     * Create a castaway
     * @param {THREE.Scene} scene 
     */
    constructor(scene, listener) {
        /* animation parameters */
        this.listener = listener
        this.NOWAVE = 0
        this.ONEHAND = 1
        this.TWOHANDS = 2
        this.UP = 1
        this.DOWN = -1
        this.rad = Math.PI/180 
        this.walkDirection = 0
        this.walking = true
        this.isWaving = this.NOWAVE
        this.isTurning = false
        this.overTurning = false
        this.overWaving = false
        this.currentSteps = 0
        this.waveCount = 0
        this.ankleDirection = -1 
        this.kneeDirection = 1 
        this.hipDirection = -1 
        this.shouldDirectionX = -.45
        this.shouldDirectionZ = -3
        this.handDirectionX = -2
        this.handDirectionZ = 0
        this.handDirectionY = 0
        this.startedWaving = 0
        this.prevFrameTime = 0
        this.currentFrameTime = 0
        
        var unit = .02 // dimensions of one basic cube
        this.bodyMaterial = new THREE.MeshLambertMaterial({color: 0xc68642}) // material for the skin
        this.pantsMaterial = new THREE.MeshLambertMaterial({color: 0x990000}) // material for pants
        this.hairMaterial = new THREE.MeshLambertMaterial({color: 0x000000}) // material for hair

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

        this.pHipR.position.y = unit*17 // positioning leg relative to terrain (sole touches the floor)
        this.pHipR.position.x = unit*-3


         /* duplicate leg */
        this.pHipL = this.pHipR.clone()

        this.pHipL.position.x = unit*3 // positioning leg mirrored on x axis

        this.pKneeL = this.pHipL.children[0].children[2]

        this.pAnkleL = this.pKneeL.children[2]

        this.mainPivot.add(this.pHipR) // mainPivot gains control of legs 
        this.mainPivot.add(this.pHipL)

        
        /* arm modeling */
        /* hand modeling snippet */
        var handGroup = Castaway.generateJointAndBone(unit, this.bodyMaterial, 2, 2, 2, this.bodyMaterial, 4, 1, 2)

        handGroup.bone.position.x = unit*-2 // positioning hand relative to wrist pivot

        var thumb =  new THREE.Mesh(new THREE.BoxGeometry(unit*1, unit*1, unit*1), this.bodyMaterial) //generate box for thumb

        thumb.position.x = unit*-1 // positioning thumb relative to wrist pivot
        thumb.position.z = unit*1.5
        
        this.pHandR = handGroup.pivot // wrist pivot - moving the hand

        this.pHandR.add(thumb) // add thumb to wrist pivot

        /* lower arm */
        var lowerArmGroup = Castaway.generateJointAndBone(unit, this.bodyMaterial, 2, 4, 4, this.bodyMaterial, 4, 2, 2)

        lowerArmGroup.bone.position.x = unit*-2 // positioning lower arm bone relative to elbow

        this.pElbowR = lowerArmGroup.pivot // elbow pivot - moving lower arm

        this.pHandR.position.x = unit*-5 // positioning hand relative to elbow pivot

        this.pElbowR.add(this.pHandR) // hand pivot is child of elbow pivot

        /* upper arm */
        var upperArmGroup = Castaway.generateJointAndBone(unit, this.bodyMaterial, 4, 4, 4, this.bodyMaterial, 4, 2, 2)

        upperArmGroup.bone.position.x = unit*-4 // positioning upper arm bone relative to shoulder

        var arm = upperArmGroup.pivot // arm container

        this.pElbowR.position.x = unit*-7 // positioning lower arm relative to shoulder pivot

        this.pShoulderR = new THREE.Object3D() // shoulder pivot - moving lower arm 
        arm.add(this.pElbowR)   // lower arm is part of arm 

        //arm.position.y = unit*1
        //arm.position.x = unit*-1

        this.pShoulderR.add(arm) // arm is child of shoulder pivot (move shoulder -> move elbow -> move wrist)


        /* add arm to body */
        this.pShoulderR.position.y = unit*25
        this.pShoulderR.position.x = unit*-6
        this.pShoulderR.position.z = unit*-2.5

        this.mainPivot.add(this.pShoulderR)
        
        /* duplicate arm */
        this.pShoulderL = this.pShoulderR.clone()

        this.pShoulderL.position.x = unit*6 // positioning arm mirrored on x axis
        this.pShoulderL.children[0].rotation.z = Math.PI

        //this.pShoulderL.position.y = unit*23

        this.pShoulderR.rotation.z = Math.PI/2
        this.pShoulderL.rotation.z = -Math.PI/2

        this.pElbowL = this.pShoulderL.children[0].children[2]


        this.pHandL = this.pElbowL.children[2]
        
        this.mainPivot.add(this.pShoulderL) // mainPivot gains control of arms
       
        
        /* neck and face modeling*/
        this.head = new THREE.Object3D()
        
        var neck = new THREE.Mesh(new THREE.BoxGeometry(unit*4, unit*4, unit*3), this.bodyMaterial)
        var skull = new THREE.Mesh(new THREE.BoxGeometry(unit*5, unit*5, unit*5), this.bodyMaterial)
        var jaw = new THREE.Mesh(new THREE.BoxGeometry(unit*5, unit*3, unit*2), this.bodyMaterial)
        var hairBack = new THREE.Mesh(new THREE.BoxGeometry(unit*4, unit*2, unit*1), this.hairMaterial)
        var hairTop = new THREE.Mesh(new THREE.BoxGeometry(unit*4, unit*1, unit*2), this.hairMaterial)
        var earR = new THREE.Mesh(new THREE.BoxGeometry(unit*1, unit*2, unit*1), this.bodyMaterial)
        var nose = new THREE.Mesh(new THREE.BoxGeometry(unit*1, unit*1, unit*1), this.bodyMaterial)
        

        skull.position.y = unit*2
        skull.position.z = unit*1
        jaw.position.z = unit*2.5
        jaw.position.y = unit*-1
        hairBack.position.y = unit*3
        hairBack.position.z = unit*-2
        hairTop.position.y = unit*5
        hairTop.position.z = unit
        earR.position.x = unit*-3
        earR.position.z = unit*2
        earR.position.y = unit
        nose.position.z = unit*4

        var earL = earR.clone()
        earL.position.x = unit*3

        this.head.add(skull)
        this.head.add(jaw)
        this.head.add(hairBack)
        this.head.add(hairTop)
        this.head.add(earR)
        this.head.add(earL)
        this.head.add(nose)

        this.head.position.y = unit*29
        this.head.position.z = unit*-2
        
        neck.position.y = unit*28
        neck.position.z = unit*-1

        this.mainPivot.add(this.head)
        this.mainPivot.add(neck)


        /* body modeling */
        var gBodyLower = new THREE.BoxGeometry(unit*10, unit*4, unit*5)
        var gBodyUpper = new THREE.BoxGeometry(unit*10, unit*6, unit*5)

        var bodyUpper = new THREE.Mesh(gBodyUpper, this.bodyMaterial)
        var bodyLower = new THREE.Mesh(gBodyLower, this.pantsMaterial)

        bodyUpper.castShadow = true;
        bodyUpper.receiveShadow = true;
        bodyLower.castShadow = true;
        bodyLower.receiveShadow = true;

        var neckBase = new THREE.Mesh(new THREE.BoxGeometry(unit*10, unit*2, unit*2), this.bodyMaterial)
        
        neckBase.position.y = unit*26
        neckBase.position.z = unit*-1.5

        bodyLower.position.y = unit*18
        bodyLower.position.z = unit*-1.5
        
        bodyUpper.position.y = unit*23
        bodyUpper.position.z = unit*-1.5

        this.mainPivot.add(bodyLower)
        this.mainPivot.add(bodyUpper)
        this.mainPivot.add(neckBase)

        this.mainPivot.position.y = unit*10
        this.mainPivot.position.x = unit*60
        this.mainPivot.position.z = unit*-33
        
        


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

        bone.castShadow = true;
        bone.receiveShadow = true;
        joint.castShadow = true;
        joint.receiveShadow = true;

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
    /**
     * move both legs to simulate a walk
     * @param {Number} steps number of steps castaway should walk
     * @param {Function} onEnd callback function when walking is over
     * @returns executed function
    */ 
    walkAnimation(steps, onEnd) {
        /* if hip didn't rotate forward until 30 degrees yet */
        if(this.pHipR.rotation.x < -30*this.rad) {
            if(this.currentSteps % 2 === 0){ //check to increase steps counter
                this.currentSteps += 1
            }
            this.hipDirection = 1 // hip direction forward
        } 
        /* if hip didn't rotate backward until 30 degrees yet */
        if(this.pHipR.rotation.x > 30*this.rad) {
            if(this.currentSteps % 2 === 1 ||  this.currentSteps % 2 === -1) { // check to increase steps counter
                this.currentSteps += 1
            }
            this.hipDirection = -1 // hip rotation direction backward
        } 

        /* if knee didn't rotate forward until 0 degrees yet */
        if(this.pKnee.rotation.x < 0) {
            this.kneeDirection = 1 // knee rotation direction forward
        } 
        /* if knee didn't rotate forward until 0 degrees yet */
        if(this.pKnee.rotation.x > 20*this.rad) {
            this.kneeDirection = -1
        } 

        /* 
        if(this.pAnkle.rotation.x  < -25*this.rad) {
            this.ankleDirection = 1
        } 
        if(this.pAnkle.rotation.x > 40*this.rad) {
            this.ankleDirection = -1
        }
        */
        
        /* when is done walking */
        if(this.currentSteps == steps && this.pHipR.rotation.x < 0.1 && this.pHipR.rotation.x >-0.1) {
            this.currentSteps = 0
            this.walking = false
            return onEnd()
        }
         
        /* use these parameters to move all junctions and perform walk animation (not moving forward) */
        
        /*right leg */
        //this.pAnkle.rotation.x += this.ankleDirection*this.rad 
        this.pKnee.rotation.x += 2*this.kneeDirection*this.rad
        this.pHipR.rotation.x += 2*this.hipDirection*this.rad
        
        /*left arm*/
        this.pElbowL.rotation.y += 2*this.kneeDirection*this.rad
        this.pShoulderL.rotation.x += 2*this.hipDirection*this.rad

        /*left leg */
        //this.pAnkleL.rotation.x += this.ankleDirection*this.rad 
        this.pKneeL.rotation.x += 2*this.kneeDirection*this.rad 
        this.pHipL.rotation.x += 2*this.hipDirection*-1*this.rad
        
        /* right arm */
        this.pElbowR.rotation.y += 2*this.kneeDirection*this.rad
        this.pShoulderR.rotation.x += 2*this.hipDirection*-1*this.rad

    }

    /** 
     * function to rise or take down one or two hands
     * @param {Number} direction code to define if moving arms up or down
     * @param {Number} hands code to define if one or two arms to be moved
    */
    moveArms(direction, hands) {
        /* parameters to rise up arms */
        if(direction === this.UP){
            this.shouldDirectionX = -.6
            this.shouldDirectionZ = -4
            this.handDirectionX = -3
        }
        /* parameters to take down arms */
        if(direction === this.DOWN) {
            this.shouldDirectionX = .6
            this.shouldDirectionZ = 4
            this.handDirectionX = 3
        }
        
        /* move arms based on these parameters */
        /* right hand */
        this.pShoulderR.rotation.z += this.shouldDirectionZ*this.rad
        this.pShoulderR.rotation.x += this.shouldDirectionX*this.rad
        this.pHandR.rotation.x += this.handDirectionX*this.rad
        /* optional left hand */
        if(hands === this.TWOHANDS) {   
            this.pShoulderL.rotation.z -= this.shouldDirectionZ*this.rad
            this.pShoulderL.rotation.x += this.shouldDirectionX*this.rad
            this.pHandL.rotation.x -= this.handDirectionX*this.rad 
        }

    }

    /** 
     * function to wave hand or hands
     * @param {Number} hands code to define if one or two arms to be moved
    */
    waveArms(hands) {
        /* parameters to move arms toward head */
        if(this.pElbowR.rotation.z < -80*this.rad) {
            if(this.waveCount % 2 === 0) {
                this.waveCount += 1
            }
            this.handDirectionZ = 2
            this.handDirectionY = -2
            this.handDirectionX = -3
        }
        /* parameters to move arms further from the head */
        if(this.pElbowR.rotation.z > -10*this.rad) {
            if(this.waveCount % 2 === 1 ||  this.waveCount % 2 === -1) {
                this.waveCount += 1
            }
            this.handDirectionZ = -2
            this.handDirectionY = 2
            this.handDirectionX = 3
        }

        /* use parameters to move arms */
        /* right arm */
        this.pElbowR.rotation.z += this.handDirectionZ*this.rad
        this.pElbowR.rotation.y += this.handDirectionY*this.rad
        /* optional left arm */
        if(hands === this.TWOHANDS) {   
            this.pElbowL.rotation.z -= this.handDirectionZ*this.rad
            this.pElbowL.rotation.y += this.handDirectionY*this.rad   
        }
    }

    /** 
     * function to wave hand or hands asking for help an arbitrary number of times
     * @param {Number} hands code to define if one or two arms to be moved
     * @param {Number} times number of waves
     * @param {Function} onEnd function called when animation ends
    */
    waveAnimation(hands, times, onEnd) {
        /* if waving is not over yet - or not begun */
        if(!this.overWaving) {
            /* if arms are not up yet */
            if(this.pShoulderR.rotation.z > -60*this.rad) {
                this.moveArms(this.UP, hands) // move arms uo
            } else {
                this.waveArms(hands) // wave
            }
        } else {
            /* if arms are not down yet */
            if(this.pShoulderR.rotation.z < 90*this.rad) {
                this.moveArms(this.DOWN, hands) // move arms down
            } else {
                /* wave variables */
                this.isWaving = this.NOWAVE 
                this.overWaving = false 
                this.waveCount = 0
                return onEnd() 
            }
        }
        
        /* if castaway waved enough */
        if(this.waveCount/2 === times) {
            this.overWaving = true
        }
    }

    /** 
     * function to turn castaway on its y axis a certain amount of degrees
     * @param {Number} degrees rotation angle in degrees
     * @param {Function} onEnd function called when animation ends
    */
    turn(degrees, onEnd) {
        /* if turning is not over yet */
        if(!this.overTurning) {
            this.mainPivot.rotation.y += degrees*this.rad
            this.overTurning = true
        } else {
            this.overTurning = false
            return onEnd()
        }
        
        
    }

    /**
     * utility function to select randomly from an array
     * @param {any[]} array  
     */
    randomElement(array) {
        return array[Math.floor(Math.random()*array.length)];
    }

    /**
     * update position of the castaway
     */
    update() {
        /* if frame rate is grater than 60, wait - not necessary in threejs, but good to keep in mind
        this.currentFrameTime = Date.now()
        if(this.currentFrameTime - this.prevFrameTime < 15) {
            return
        }
        */

        /* animation loop */
        /* walk */
        if(this.walking) {
                this.walkAnimation(3, () => {
                    /* over walking, start waving */
                    let waving = [this.ONEHAND, this.TWOHANDS]
                    this.isWaving = this.randomElement(waving)
                    let help = new THREE.PositionalAudio( this.listener )

                    let audioLoader = new THREE.AudioLoader();
                    audioLoader.load( 'sounds/help.ogg', function( buffer ) {
                        help.setBuffer( buffer );
                        help.setVolume( 1 );
                        help.play()
                    });	

                    this.head.add(help)                   
                })
                /* move in the walk direction */
                if(this.walkDirection % 4 === 0 ) 
                    this.mainPivot.position.z+= 0.02
                else if (this.walkDirection % 4 === 1) 
                    this.mainPivot.position.x -= 0.02
                else if(this.walkDirection % 4 === 2) 
                    this.mainPivot.position. z -= 0.02
                else
                    this.mainPivot.position.x += 0.02
            }
            /* wave */
            if(this.isWaving !== this.NOWAVE) {
                this.waveAnimation(this.isWaving, 3, () => {
                    /* over waving, start turning */
                    this.isTurning = true
                })
            }
            /* turn */
            if (this.isTurning) {
                this.turn(-90, () => {
                    /* over turning, start walking again toward new direction */
                    this.isTurning = false
                    this.walkDirection++
                    this.walking = true
                })
            }

            // this.prevFrameTime = this.currentFrameTime - utility for frame rate adjustment

        
    }
}