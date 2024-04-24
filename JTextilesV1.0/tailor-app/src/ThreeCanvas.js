import React from 'react';
import { extend, Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

extend({ PlaneGeometry: THREE.PlaneGeometry }); // Extend THREE namespace

const ThreeCanvas = ({ combinedImage }) => {
  return (
    <Canvas style={{ backgroundColor: '#f4f4f4' }}>
      <OrbitControls />
      
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial map={combinedImage} />
      </mesh>

      {combinedImage && (
        <Html position={[0, 0, 0]} distanceFactor={5}>
          <div style={{ width: '200px', height: '200px', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
            <img src={combinedImage} alt="Combined" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </Html>
      )}
    </Canvas>
  );
};

export default ThreeCanvas;
