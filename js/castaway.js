class Castaway  {

    constructor(scene) {
        this.geometry = new THREE.BoxGeometry(1,1,1);
		//var texture = THREE.ImageUtils.loadTexture('textures/11635.jpg');
        //var material = new THREE.MeshPhongMaterial( { map: texture } );
        this.material = new THREE.MeshBasicMaterial({color: 0x444444})
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.aCube = new THREE.Mesh( this.geometry, this.material );
        this.aCube.position.x = 5
        this.mainPivot = new THREE.Object3D

        this.mainPivot.add(this.cube)
        this.mainPivot.add(this.aCube)

        scene.add(this.mainPivot)
    }

    update() {
        if(this.mainPivot.rotation.y >= 180*Math.PI/180) {
            return
        }
        this.mainPivot.rotation.y += 1*Math.PI/180
        console.log("this: "+ this.mainPivot.rotation.y)
        console.log("const: " + 180*Math.PI/180)
        
        
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