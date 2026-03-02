#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const galleryDir = path.join(rootDir, 'public', 'uploads', 'gallery')
const outputDir = path.join(rootDir, 'public')

try {
    // Cria pasta output se não existir
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    // Lê arquivos da pasta de galeria
    let galleryFiles = []
    if (fs.existsSync(galleryDir)) {
        galleryFiles = fs.readdirSync(galleryDir)
            .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
            .sort()
            .map(f => `/uploads/gallery/${f}`)
    }

    // Cria JSON com lista de imagens
    const galleryData = {
        images: galleryFiles,
        count: galleryFiles.length,
        generated: new Date().toISOString()
    }

    // Escreve JSON
    const outputFile = path.join(outputDir, 'gallery-list.json')
    fs.writeFileSync(outputFile, JSON.stringify(galleryData, null, 2))
    
    console.log(`✓ Gallery list generated: ${galleryFiles.length} images`)
    console.log(`  File: ${outputFile}`)
} catch (err) {
    console.error('Error generating gallery list:', err.message)
    process.exit(1)
}
