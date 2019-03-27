class Castaway  {

    constructor(scene) {

        var baseCube = new THREE.BoxGeometry(.1, .1, .1)
        this.bodyMaterial = new THREE.MeshBasicMaterial({color: 0xc68642})
        this.pantsMaterial = new THREE.MeshBasicMaterial({color: 0x990000})

        var cubea = new THREE.Mesh(baseCube, this.pantsMaterial)
        /* foot modeling */
        var foot = new THREE.Object3D()


        /*
		//var texture = THREE.ImageUtils.loadTexture('textures/11635.jpg');
        //var material = new THREE.MeshPhongMaterial( { map: texture } );
        var material = new THREE.MeshBasicMaterial({color: 0x444444})
        var cube = new THREE.Mesh( geometry, material );
        this.aCube = new THREE.Mesh( geometry, material );
        this.aCube.position.x = 5
        */

        this.mainPivot = new THREE.Object3D()

        this.mainPivot.add(cubea)

        scene.add(this.mainPivot)
    }

    update() {
        this.mainPivot.rotation.y += 1*Math.PI/180        
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