import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ServiceShowcase3DProps {
  categoryIcon: string;
  categoryName: string;
}

export const ServiceShowcase3D: React.FC<ServiceShowcase3DProps> = ({ categoryIcon, categoryName }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0.35, 5.2);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights with high vibrancy
    const ambLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambLight);

    const sunLight = new THREE.DirectionalLight(0xf8d706, 3.5);
    sunLight.position.set(4, 6, 4);
    scene.add(sunLight);

    const blueLight = new THREE.PointLight(0x1f74ba, 3.5, 10);
    blueLight.position.set(-3, 2, 2);
    scene.add(blueLight);

    const orangeLight = new THREE.PointLight(0xf09120, 2.5, 8);
    orangeLight.position.set(0, -1, 2);
    scene.add(orangeLight);

    const mainGroup = new THREE.Group();
    mainGroup.scale.set(0.9, 0.9, 0.9);
    scene.add(mainGroup);

    // Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf8d706,
      metalness: 0.8,
      roughness: 0.25,
    });
    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x1f74ba,
      metalness: 0.6,
      roughness: 0.3,
    });
    const saffronMat = new THREE.MeshStandardMaterial({
      color: 0xf09120,
      metalness: 0.4,
      roughness: 0.4,
    });

    // Base Floating Pedestal
    const baseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.18, 32);
    const baseMesh = new THREE.Mesh(baseGeo, blueMat);
    baseMesh.position.y = -0.9;
    mainGroup.add(baseMesh);

    const goldRingGeo = new THREE.TorusGeometry(1.65, 0.04, 16, 32);
    const goldRing = new THREE.Mesh(goldRingGeo, goldMat);
    goldRing.rotation.x = Math.PI / 2;
    goldRing.position.y = -0.82;
    mainGroup.add(goldRing);

    // Category-specific 3D center piece
    const centerGroup = new THREE.Group();
    mainGroup.add(centerGroup);

    if (categoryIcon === 'Tent' || categoryIcon === 'Armchair') {
      // 3D Royal Canopy Pavilion
      const canopyGeo = new THREE.ConeGeometry(1.3, 0.7, 8, 1, true);
      const canopy = new THREE.Mesh(canopyGeo, blueMat);
      canopy.position.y = 0.6;
      centerGroup.add(canopy);

      // Gold spire
      const spireGeo = new THREE.ConeGeometry(0.18, 0.5, 16);
      const spire = new THREE.Mesh(spireGeo, goldMat);
      spire.position.y = 1.15;
      centerGroup.add(spire);

      // 4 Pillars
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2 + Math.PI / 4;
        const pGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.3, 16);
        const pillar = new THREE.Mesh(pGeo, goldMat);
        pillar.position.set(Math.cos(angle) * 0.9, -0.2, Math.sin(angle) * 0.9);
        centerGroup.add(pillar);
      }
    } else if (categoryIcon === 'Disc' || categoryIcon === 'Truck') {
      // 3D DJ Speaker Stack & Laser Head
      const boxGeo = new THREE.BoxGeometry(0.9, 1.2, 0.7);
      const speakerBox = new THREE.Mesh(boxGeo, blueMat);
      speakerBox.position.y = -0.1;
      centerGroup.add(speakerBox);

      // Cones for subwoofers
      for (let y of [0.2, -0.3]) {
        const coneGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.08, 24);
        const cone = new THREE.Mesh(coneGeo, saffronMat);
        cone.rotation.x = Math.PI / 2;
        cone.position.set(0, y, 0.36);
        centerGroup.add(cone);
      }

      // Moving Head Sharpy on top
      const headGeo = new THREE.SphereGeometry(0.26, 16, 16);
      const head = new THREE.Mesh(headGeo, goldMat);
      head.position.y = 0.75;
      centerGroup.add(head);
    } else if (categoryIcon === 'UtensilsCrossed') {
      // 3D Royal Buffet Chafer & Chhatri
      const chaferGeo = new THREE.CylinderGeometry(0.55, 0.5, 0.4, 24);
      const chafer = new THREE.Mesh(chaferGeo, goldMat);
      chafer.position.y = -0.35;
      centerGroup.add(chafer);

      const lidGeo = new THREE.SphereGeometry(0.56, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const lid = new THREE.Mesh(lidGeo, saffronMat);
      lid.position.y = -0.15;
      centerGroup.add(lid);

      const archGeo = new THREE.TorusGeometry(0.9, 0.05, 16, 32, Math.PI);
      const arch = new THREE.Mesh(archGeo, blueMat);
      arch.position.y = 0.15;
      centerGroup.add(arch);
    } else {
      // Light / Floral / Default Mandap Kalash
      const kalashGeo = new THREE.SphereGeometry(0.45, 24, 24);
      const kalash = new THREE.Mesh(kalashGeo, goldMat);
      kalash.position.y = -0.05;
      kalash.scale.set(1, 1.1, 1);
      centerGroup.add(kalash);

      const crownGeo = new THREE.ConeGeometry(0.35, 0.6, 16);
      const crown = new THREE.Mesh(crownGeo, saffronMat);
      crown.position.y = 0.55;
      centerGroup.add(crown);

      // Light halos
      const haloGeo = new THREE.TorusGeometry(0.85, 0.03, 16, 32);
      const halo = new THREE.Mesh(haloGeo, goldMat);
      halo.rotation.x = Math.PI / 2;
      halo.position.y = 0.1;
      centerGroup.add(halo);
    }

    // Sparkles particles
    const particleCount = 45;
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      partPos[i * 3] = (Math.random() - 0.5) * 3.5;
      partPos[i * 3 + 1] = Math.random() * 2.5 - 0.8;
      partPos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0xf8d706,
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(partGeo, partMat);
    mainGroup.add(particles);

    // Animation Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      mainGroup.rotation.y += 0.01;
      mainGroup.position.y = Math.sin(Date.now() * 0.002) * 0.06;

      const positions = partGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.004;
        if (positions[i] > 2.0) positions[i] = -0.8;
      }
      partGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [categoryIcon]);

  return (
    <div className="relative w-full h-80 sm:h-96 min-h-[320px] flex items-center justify-center select-none overflow-hidden rounded-3xl bg-gradient-to-b from-blue-50/50 via-white to-amber-50/30 border border-[#1F74BA]/20 shadow-inner">
      <div ref={mountRef} className="w-full h-full min-h-[320px] cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F74BA] bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-blue-100 shadow-xs flex items-center gap-1.5 animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-[#F8D706] inline-block" />
          <span>3D पूर्वावलोकन: {categoryName}</span>
        </span>
      </div>
    </div>
  );
};
