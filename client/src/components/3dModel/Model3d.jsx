import React from "react";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  EnvironmentMap,
} from "@react-three/drei";

import { TextureLoader } from "three";

export function Fantasybg(props) {
  const spining = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    spining.current.rotation.y = elapsedTime / 40;
  });

  const { nodes, materials } = useGLTF("/singuCC.glb");
  return (
    <group {...props} dispose={null} ref={spining} scale={0.21}>
      <mesh
        geometry={nodes.Toon_geo_Toon_0.geometry}
        material={materials.Toon}
      />
      <mesh
        geometry={nodes.Toon_geo_Toon_0_1.geometry}
        material={materials.Toon}
      />
      <mesh
        geometry={nodes.Toon_geo_Toon_0_2.geometry}
        material={materials.Toon}
      />
      <mesh
        geometry={nodes.Toon_geo_Toon_0_3.geometry}
        material={materials.Toon}
      />
      <mesh
        geometry={nodes.Toon_geo_Toon_0_4.geometry}
        material={materials.Toon}
      />
      <mesh
        geometry={nodes.Toon_geo_Toon_0_5.geometry}
        material={materials.Toon}
      />
      <mesh
        geometry={nodes.Toon_geo_Toon_0_6.geometry}
        material={materials.Toon}
      />
      <mesh
        geometry={nodes.Electricity_geo_Electricity_0.geometry}
        material={materials.Electricity}
      />
      <mesh
        geometry={nodes.NeonPulse_geo_NeonPulse_0.geometry}
        material={materials.NeonPulse}
      />
      <mesh
        geometry={nodes.Light_geo_Light_0.geometry}
        material={materials.Light}
      />
    </group>
  );
}

function Model3d() {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <spotLight intensity={0.3} angle={0.2} penumbra={4} />

      <Suspense fallback={null}>
        <Fantasybg />

        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -0.8, 0]}
          opacity={0.25}
          width={10}
          height={10}
          blur={2}
          far={1}
        />
      </Suspense>
      <OrbitControls
        // minPolarAngle={Math.PI / 2.5}
        // maxPolarAngle={Math.PI / 1.9}
        enableZoom={false}
        enablePan={true}
      />
    </Canvas>
  );
}

export default Model3d;
