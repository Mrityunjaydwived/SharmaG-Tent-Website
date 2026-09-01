import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Footer3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0.45, 5.2);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xf8d706, 3.2);
    dirLight.position.set(4, 6, 4);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x1f74ba, 3.5, 12);
    blueLight.position.set(-3, 2, 2);
    scene.add(blueLight);

    const group = new THREE.Group();
    group.scale.set(0.85, 0.85, 0.85);
    scene.add(group);

    // Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf8d706,
      metalness: 0.85,
      roughness: 0.25,
    });

    const royalBlueMat = new THREE.MeshStandardMaterial({
      color: 0x1f74ba,
      metalness: 0.5,
      roughness: 0.35,
    });

    const saffronMat = new THREE.MeshStandardMaterial({
      color: 0xf09120,
      metalness: 0.4,
      roughness: 0.4,
    });

    // 1. Multi-tier Royal Pedestal
    const baseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.2, 32);
    const baseMesh = new THREE.Mesh(baseGeo, royalBlueMat);
    baseMesh.position.y = -0.8;
    group.add(baseMesh);

    const tierGeo = new THREE.CylinderGeometry(1.3, 1.5, 0.15, 32);
    const tierMesh = new THREE.Mesh(tierGeo, goldMat);
    tierMesh.position.y = -0.63;
    group.add(tierMesh);

    // 2. Pillars (4 Golden Mandap Pillars)
    const pillarRadius = 0.07;
    const pillarHeight = 1.3;
    const pillarDist = 0.95;
    const pillarGeo = new THREE.CylinderGeometry(pillarRadius, pillarRadius, pillarHeight, 16);

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const x = Math.cos(angle) * pillarDist;
      const z = Math.sin(angle) * pillarDist;
      const pMesh = new THREE.Mesh(pillarGeo, goldMat);
      pMesh.position.set(x, 0.05, z);
      group.add(pMesh);

      // Capital / Base rings
      const ringGeo = new THREE.TorusGeometry(0.1, 0.025, 8, 16);
      const ringMeshTop = new THREE.Mesh(ringGeo, saffronMat);
      ringMeshTop.rotation.x = Math.PI / 2;
      ringMeshTop.position.set(x, 0.65, z);
      group.add(ringMeshTop);

      const ringMeshBot = ringMeshTop.clone();
      ringMeshBot.position.set(x, -0.55, z);
      group.add(ringMeshBot);
    }

    // 3. Royal Pavilion Pagoda Canopy / Chhatri
    const canopyGeo = new THREE.ConeGeometry(1.35, 0.7, 32, 1, true);
    const canopyMesh = new THREE.Mesh(canopyGeo, royalBlueMat);
    canopyMesh.position.y = 0.95;
    group.add(canopyMesh);

    const canopyTrimGeo = new THREE.TorusGeometry(1.35, 0.04, 16, 32);
    const canopyTrim = new THREE.Mesh(canopyTrimGeo, goldMat);
    canopyTrim.rotation.x = Math.PI / 2;
    canopyTrim.position.y = 0.6;
    group.add(canopyTrim);

    // 4. Sacred Kalash (घट / कलश) on top
    const kalashBase = new THREE.SphereGeometry(0.24, 24, 24);
    const kalashMesh = new THREE.Mesh(kalashBase, goldMat);
    kalashMesh.position.y = 1.42;
    kalashMesh.scale.set(1, 0.9, 1);
    group.add(kalashMesh);

    // Kalash Spire & Coconut
    const coconutGeo = new THREE.ConeGeometry(0.18, 0.35, 16);
    const coconutMesh = new THREE.Mesh(coconutGeo, saffronMat);
    coconutMesh.position.y = 1.68;
    group.add(coconutMesh);

    const finialGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const finialMesh = new THREE.Mesh(finialGeo, goldMat);
    finialMesh.position.y = 1.9;
    group.add(finialMesh);

    // 5. Central Glowing Chandelier Diya / Lamp inside
    const diyaGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const diyaMat = new THREE.MeshBasicMaterial({ color: 0xffe234 });
    const diyaMesh = new THREE.Mesh(diyaGeo, diyaMat);
    diyaMesh.position.y = 0.15;
    group.add(diyaMesh);

    // PointLight for glowing chandelier
    const innerLight = new THREE.PointLight(0xf8d706, 2.5, 5);
    innerLight.position.set(0, 0.15, 0);
    group.add(innerLight);

    // 6. Floating Gold Sparkles Particles
    const sparkleCount = 60;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePos = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount; i++) {
      sparklePos[i * 3] = (Math.random() - 0.5) * 4;
      sparklePos[i * 3 + 1] = Math.random() * 2.8 - 0.8;
      sparklePos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0xf8d706,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    group.add(sparkles);

    // Animation variables
    let reqId: number;
    let mouseX = 0;
    let targetRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      mouseX = x * 1.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Continuous gentle rotation + mouse tilt
      targetRotY += 0.012;
      group.rotation.y = targetRotY + mouseX * 0.4;
      group.rotation.x = Math.sin(Date.now() * 0.0015) * 0.06;

      // Diya pulsing
      const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.15;
      diyaMesh.scale.set(pulse, pulse, pulse);

      // Sparkles slow rise
      const positions = sparkleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < sparkleCount * 3; i += 3) {
        positions[i] += 0.003;
        if (positions[i] > 2.2) {
          positions[i] = -0.8;
        }
      }
      sparkleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 340;
      const h = container.clientHeight || 240;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[280px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-blue-50/40 to-white">
      <div ref={mountRef} className="w-full h-full min-h-[280px] cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 inset-x-0 flex items-center justify-center pointer-events-none">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F74BA] bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-blue-100 shadow-xs flex items-center gap-1.5 animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-[#F8D706] inline-block" />
          <span>3D रॉयल मंडप छतरी व कलश</span>
        </span>
      </div>
    </div>
  );
};
