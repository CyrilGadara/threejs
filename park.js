// let scene;
// function init(){
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xdddddd);
//     camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
//     camera.rotation.y = 45/180*Math.PI;
//     camera.position.x = 800;
//     camera.position.y = 100;
//     camera.position.z = 100;
//     camera.position.set(20,0,20);
//     hlight = new THREE.AmbientLight(0x404040,100);
//     scene.add(hlight);0
//     renderer = new THREE.WebGLRenderer({antialias:true});
//     renderer.setSize(window.innerWidth,window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     let controls = new THREE.OrbitControls(camera,renderer.domElement);
//     controls.update();

//     var abint = new THREE.AmbientLight(0x555500);
//     scene.add(abint)
//     let loader = new THREE.GLTFLoader();
//     loader.load('sushi.glb', function(gltf){
//         scene.add(gltf.scene);
//         renderer.render(scene,camera);
//     })a
 
// }

// init();

let scene,camera,renderer;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x64D2E7);
    height = 15;
    width = 15;
    camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,5000);

    
    // camera.rotation.y = 45/180*Math.PI;
    // camera.position.x = 800;
    // camera.position.y = 100;
    // camera.position.z = 100;
    camera.position.set(15,10,10);

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', animate)
    //controls.enableDamping = true;
    controls.screenSpacePanning = false;
    controls.autoRotate = true;
    controls.rotateSpeed = 0.4;
    
    //controls.dampingFactor = 0.005;
    controls.minDistance = 5;
    controls.maxDistance = 30;
    controls.minPolarAngle = 0.7;
    controls.maxPolarAngle = Math.PI * .5;
    controls.enablePan = false;
    controls.minAzimuthAngle = 0;
	controls.maxAzimuthAngle =  Math.PI;

    hlight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5 );
    hlight.position.set(0,5,-6);
    hlight.castShadow = true;
    scene.add(hlight);

    const light = new THREE.DirectionalLight( 0xffffff, 3);
    light.position.set( -5,1, 6 ); //default; light shining from top
    light.castShadow = true; // default false
    light.shadow.bias = -0.00029;
    scene.add( light );
    
    light.shadow.mapSize.width = 1500; // default
    light.shadow.mapSize.height = 1500; // default
    light.shadow.camera.near = 25; // default
    light.shadow.camera.far = 1000; // default


    //helper
    const helper = new THREE.DirectionalLightHelper( light,5);
    //scene.add( helper );

    const hhelper = new THREE.HemisphereLightHelper( hlight, 5 );
    //scene.add( hhelper );

    const SpotLight = new THREE.SpotLight(0xffffff, 0.9);
    SpotLight.position.set(10,1000,100)
    SpotLight.shadow.camera.near = 500
    SpotLight.shadow.far = 4000;
    SpotLight.shadow.camera.fov = 30
    SpotLight.castShadow = true;
    //scene.add(SpotLight)

    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 4);
    scene.add(hemiLight);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.gamaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);


    const geometry = new THREE.PlaneGeometry( 50, 50, 50 );
    const material = new THREE.MeshBasicMaterial( {color: 0x64D2E7, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh (geometry,material);
    plane.receiveShadow = true;
    //plane.castShadow = true;
    plane.rotation.x -= Math.PI/2;
    scene.add( plane );
    
    
    
    let loader = new THREE.GLTFLoader();
    loader.load('park.glb',function(gltf){
        sushi = gltf.scene;
        //console.log(sushi.child)
        sushi.rotation.x += 0.01;
        sushi.material = new THREE.MeshNormalMaterial();
        sushi.traverse(function(node){
            
            if ( node.isMesh || node.isLight ) node.castShadow = true;
            if ( node.isMesh || node.isLight ) node.receiveShadow = true;

        })

        

        
        sushi.scale.set(1.5,1.5,1.5)
        scene.add(gltf.scene);
        animate();

    })
}

function animate(){
    renderer.render(scene,camera);

    requestAnimationFrame(animate);
    
}

init();