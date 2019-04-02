class Island  {
    /**
     * Create an island made of sand in the middle of a sea
     * @param {THREE.Scene} scene 
     */
    constructor(scene) {
        var pivot = new THREE.Object3D()

        //beach ground n.1
        var geometry = new THREE.BoxGeometry(3,0.2,3);
        var texture = THREE.ImageUtils.loadTexture('textures/sand01.jpg');
        var material = new THREE.MeshLambertMaterial( { map: texture } );
        texture.repeat.set(4,4);
        texture.wrapS =THREE.RepeatWraping;
        texture.wrapT = THREE.RepeatWraping;
        var cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.position.set(0, 0.05, 0)

        pivot.add( cube );

        //beach ground n.2
        var geometry1 = new THREE.BoxGeometry(1.6,0.2,1.8);
        var texture1 = THREE.ImageUtils.loadTexture('textures/sand01.jpg');
        var material1 = new THREE.MeshLambertMaterial( { map: texture1 } );
        texture1.repeat.set(2,2);
        texture1.wrapS =THREE.RepeatWraping;
        texture1.wrapT = THREE.RepeatWraping;
        var cube1 = new THREE.Mesh( geometry1, material1 );
        cube1.position.set(-0.3, 0.15, 0)

        cube1.castShadow = true;
        cube1.receiveShadow = true;
        
        pivot.add( cube1 );

        //beach ground n.3
        var geometry2 = new THREE.BoxGeometry(1,0.3,1);
        var texture2 = THREE.ImageUtils.loadTexture('textures/sand01.jpg');
        texture2.repeat.set(1,1);
        texture2.wrapS =THREE.RepeatWraping;
        texture2.wrapT = THREE.RepeatWraping;
        var material2 = new THREE.MeshLambertMaterial( { map: texture2 } );
        var cube2 = new THREE.Mesh( geometry2, material2 );
        cube2.position.set(-0.5, 0.2, 0)

        cube2.castShadow = true;
        cube2.receiveShadow = true;
        
        pivot.add( cube2 );
        
        //sea cube
        var geometry3 = new THREE.BoxGeometry(30.1,0.1,30.1);
        var texture3 = THREE.ImageUtils.loadTexture('textures/sea01.jpg');
        texture3.repeat.set(10,10);
        texture3.wrapS =THREE.RepeatWraping;
        texture3.wrapT = THREE.RepeatWraping;
        var material3 = new THREE.MeshLambertMaterial( { 
            map: texture3,
            //premultipliedAlpha: true,
            transparent: true, opacity: 0.4} );
        var cube3 = new THREE.Mesh( geometry3, material3 );
        cube3.castShadow = true;
        cube3.receiveShadow = true;
        cube3.position.set(0, 0.01, 0)

        pivot.add( cube3 );
        
        //beach ground same as sea cube
        var geometry5 = new THREE.BoxGeometry(30,0.1,30);
        var texture5 = THREE.ImageUtils.loadTexture('textures/sand01.jpg');
        var material5 = new THREE.MeshLambertMaterial( { map: texture5 } );
        texture5.repeat.set(10,10);
        texture5.wrapS =THREE.RepeatWraping;
        texture5.wrapT = THREE.RepeatWraping;
        var cube5 = new THREE.Mesh( geometry5, material5 );
        cube5.castShadow = true;
        cube5.receiveShadow = true;
        cube5.position.set(0, 0, 0)

        pivot.add( cube5 );

        scene.add(pivot)
    }
}
