class Island extends THREE.Mesh {
    /**
     * Create an island made of sand in the middle of a sea
     */
    constructor() {
        var pivot = new THREE.Object3D()

        //beach ground n.1
        var geometry = new THREE.BoxGeometry(3,0.2,3);
        var texture = new THREE.TextureLoader().load('textures/sand.jpg');
        var material = new THREE.MeshLambertMaterial( { map: texture } );
        texture.repeat.set(4,4);
        texture.wrapS =THREE.RepeatWraping;
        texture.wrapT = THREE.RepeatWraping;
        var cube = new THREE.Mesh( geometry, material );
        cube.receiveShadow = true;
        cube.position.set(0, 0.05, 0)

        pivot.add( cube );

        //beach ground n.2
        var geometry1 = new THREE.BoxGeometry(1.6,0.2,1.8);
        var texture1 = new THREE.TextureLoader().load('textures/sand.jpg');
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
        var texture2 = new THREE.TextureLoader().load('textures/sand.jpg');
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
        var geometry3 = new THREE.BoxGeometry(30.1,0.2,30.1);
        var texture3 = new THREE.TextureLoader().load('textures/sea.jpg');
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
        var texture5 = new THREE.TextureLoader().load('textures/sand.jpg');
        var material5 = new THREE.MeshLambertMaterial( { map: texture5 } );
        texture5.repeat.set(10,10);
        texture5.wrapS =THREE.RepeatWraping;
        texture5.wrapT = THREE.RepeatWraping;
        var cube5 = new THREE.Mesh( geometry5, material5 );
        cube5.castShadow = true;
        cube5.receiveShadow = true;
        cube5.position.set(0, 0, 0)
        

        pivot.add( cube5 );

        //adding smaller parts on every ground level

        //small parts beach ground n.1 
        var smallPartGroundGeo1 = new THREE.BoxGeometry(2.6,0.2,0.1);
        var smallPartGroundText1= new THREE.TextureLoader().load('textures/sand.jpg');
        var smallPartGroundMat1 = new THREE.MeshLambertMaterial( { map: smallPartGroundText1 } );
        smallPartGroundText1.repeat.set(5,1);
        smallPartGroundText1.wrapS =THREE.RepeatWraping;
        smallPartGroundText1.wrapT = THREE.RepeatWraping;
        var smallPartGround1 = new THREE.Mesh( smallPartGroundGeo1, smallPartGroundMat1 );
        smallPartGround1.castShadow = true;
        //smallPartGround1.receiveShadow = true;
        smallPartGround1.position.set(0.04, 0.05, 1.55)
        smallPartGround1.castShadow = true;
        smallPartGround1.receiveShadow = true;

        pivot.add( smallPartGround1 );

        //duplicating the small ground parts on ground n.1
        var smallPartGround2 = smallPartGround1.clone();
		smallPartGround2.position.set(0.04, 0.05, -1.55); 
        pivot.add( smallPartGround2 );
        smallPartGround2.receiveShadow = true;

        var smallPartGround3 = smallPartGround1.clone();
        smallPartGround3.position.set(1.55, 0.05, 0.05); 
        smallPartGround3.rotation.y = Math.PI/2;
        smallPartGround3.receiveShadow = true;
        pivot.add( smallPartGround3 );
    
        var smallPartGround4 = smallPartGround1.clone();
        smallPartGround4.position.set(-1.55, 0.05, 0.05); 
        smallPartGround4.rotation.y = Math.PI/2;
        smallPartGround4.receiveShadow = true;
        pivot.add( smallPartGround4 );

         //small parts beach ground n.2 
         var smallPartGroundGeo5 = new THREE.BoxGeometry(1.3,0.2,0.1);
         var smallPartGroundText5= new THREE.TextureLoader().load('textures/sand.jpg');
         var smallPartGroundMat5 = new THREE.MeshLambertMaterial( { map: smallPartGroundText5 } );
         smallPartGroundText1.repeat.set(2,0.5);
         smallPartGroundText1.wrapS =THREE.RepeatWraping;
         smallPartGroundText1.wrapT = THREE.RepeatWraping;
         var smallPartGround5 = new THREE.Mesh( smallPartGroundGeo5, smallPartGroundMat5 );
         smallPartGround1.receiveShadow = true;
         smallPartGround5.position.set(-0.3, 0.15, 0.95)
         smallPartGround5.receiveShadow = true;
 
         pivot.add( smallPartGround5 );

         //duplicating the small ground parts on ground n.2
        var smallPartGround6 = smallPartGround5.clone();
        smallPartGround6.position.set(-0.3, 0.15, -0.95); 
        smallPartGround6.receiveShadow = true;
        pivot.add( smallPartGround6 );

        var smallPartGround7 = smallPartGround5.clone();
        smallPartGround7.position.set(0.55, 0.15, 0.05); 
        smallPartGround7.rotation.y = Math.PI/2;
        smallPartGround7.receiveShadow = true;
        pivot.add( smallPartGround7 );
        
        var smallPartGround8 = smallPartGround5.clone();
        smallPartGround8.position.set(-1.15, 0.15, 0.05); 
        smallPartGround8.rotation.y = Math.PI/2;
        smallPartGround8.receiveShadow = true;
        pivot.add( smallPartGround8 );

        //small parts beach ground n.3
        var smallPartGroundGeo9 = new THREE.BoxGeometry(0.7,0.2,0.1);
        var smallPartGroundText9= new THREE.TextureLoader().load('textures/sand.jpg');
        var smallPartGroundMat9 = new THREE.MeshLambertMaterial( { map: smallPartGroundText9 } );
        smallPartGroundText1.repeat.set(10,1);
        smallPartGroundText1.wrapS =THREE.RepeatWraping;
        smallPartGroundText1.wrapT = THREE.RepeatWraping;
        var smallPartGround9 = new THREE.Mesh( smallPartGroundGeo9, smallPartGroundMat9 );
        smallPartGround9.castShadow = true;
        //smallPartGround1.receiveShadow = true;
        smallPartGround9.position.set(-0.5, 0.25, 0.55)
        smallPartGround9.receiveShadow = true;

        pivot.add( smallPartGround9 );

        //duplicating the small ground parts on ground n.3
       var smallPartGround10 = smallPartGround9.clone();
       smallPartGround10.position.set(-0.5, 0.25, -0.55); 
       smallPartGround10.receiveShadow = true;
       pivot.add( smallPartGround10 );

       var smallPartGround11 = smallPartGround9.clone();
       smallPartGround11.position.set(0.05, 0.25, 0.05); 
       smallPartGround11.rotation.y = Math.PI/2;
       smallPartGround11.receiveShadow = true;
       pivot.add( smallPartGround11 );
       
       var smallPartGround12 = smallPartGround9.clone();
       smallPartGround12.position.set(-1.05, 0.25, 0.05); 
       smallPartGround12.rotation.y = Math.PI/2;
       smallPartGround12.receiveShadow = true;
       pivot.add( smallPartGround12 );

        //fire cubes
        var fireGeo1 = new THREE.BoxGeometry(0.1,0.1,0.1);
        var fireMat1 = new THREE.MeshLambertMaterial( { color: 0x180e01 } );
        var fire1 = new THREE.Mesh( fireGeo1, fireMat1 );
        //fire1.position.set(-1, 0.2, 1.3)
        fire1.position.set(0, 0.3, .7)
        fire1.castShadow = true;
        fire1.receiveShadow = true;
        pivot.add( fire1 );
        //duplication 3 more fire cubes
        var fire2 = fire1.clone();
        //fire2.position.set(-1.2, 0.2, 1.3); 
       fire2.position.set(-.2, .3, .7); 
       fire2.castShadow = true;
       fire2.receiveShadow = true;
       pivot.add( fire2 );

       var fire3 = fire1.clone();
       //fire3.position.set(-1.1, 0.2, 1.2); 
       fire3.position.set(-.1, .3, .6); 
       fire3.castShadow = true;
       fire3.receiveShadow = true;
       pivot.add( fire3 );

       var fire4 = fire1.clone();
       //fire4.position.set(-1.1, 0.2, 1.4); 
       fire4.position.set(-.1, 0.3, .8); 
       fire4.castShadow = true;
       fire4.receiveShadow = true;
       pivot.add( fire4 );

       //burning fire1
       var bfireGeo1 = new THREE.BoxGeometry(0.08,0.2,0.1);
       var bfireMat1 = new THREE.MeshLambertMaterial( { color: 0xf8fc0d } );
       var bfire1 = new THREE.Mesh( bfireGeo1, bfireMat1 );
       //bfire1.position.set(-1.1, 0.2, 1.3)
       bfire1.position.set(-.1, 0.3, .7)
       pivot.add( bfire1 );

       //burning fire2
       var bfireGeo2 = new THREE.BoxGeometry(0.1,0.25,0.1);
       var bfireMat2 = new THREE.MeshLambertMaterial( { 
           color: 0xf8fc0d,
           premultipliedAlpha: true,
           transparent: true, opacity: 0.3} );
       var bfire2 = new THREE.Mesh( bfireGeo2, bfireMat2 );
       //bfire2.position.set(-1.1, 0.2, 1.3)
       bfire2.position.set(-.1, .3, .7)
       pivot.add( bfire2 );

        return pivot
       
    }
}
