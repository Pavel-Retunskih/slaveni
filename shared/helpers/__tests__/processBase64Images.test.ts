import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  extractBase64Images,
  base64ToFile,
  uploadBase64Images,
  replaceBase64WithUrls,
  type Base64Image,
} from '../processBase64Images'
import type { UploadResult } from '../uploadFile'

describe('processBase64Images', () => {
  describe('extractBase64Images', () => {
    it('should extract base64 images from HTML', () => {
      const html = `
        <p>Some text</p>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="test" />
        <p>More text</p>
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/wA=" />
      `

      const images = extractBase64Images(html)

      expect(images).toHaveLength(2)
      expect(images[0]).toMatchObject({
        mimeType: 'image/png',
        dataUrl: expect.stringContaining('data:image/png;base64,'),
      })
      expect(images[1]).toMatchObject({
        mimeType: 'image/jpeg',
        dataUrl: expect.stringContaining('data:image/jpeg;base64,'),
      })
    })

    it('should return empty array when no base64 images found', () => {
      const html = `
        <p>Some text</p>
        <img src="https://example.com/image.png" alt="test" />
      `

      const images = extractBase64Images(html)

      expect(images).toHaveLength(0)
    })

    it('should handle malformed HTML gracefully', () => {
      const html = '<img src="data:image/png;base64," />'

      const images = extractBase64Images(html)

      expect(images).toHaveLength(0)
    })
  })

  describe('base64ToFile', () => {
    it('should convert base64 string to File object', () => {
      const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      const mimeType = 'image/png'
      const filename = 'test.png'

      const file = base64ToFile(base64Data, mimeType, filename)

      expect(file).toBeInstanceOf(File)
      expect(file.name).toBe(filename)
      expect(file.type).toBe(mimeType)
      expect(file.size).toBeGreaterThan(0)
    })

    it('should handle different image types', () => {
      const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      const mimeType = 'image/jpeg'
      const filename = 'test.jpg'

      const file = base64ToFile(base64Data, mimeType, filename)

      expect(file.type).toBe(mimeType)
      expect(file.name).toBe(filename)
    })
  })

  describe('uploadBase64Images', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('should upload all base64 images and return upload map', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ url: 'https://storage.com/image.png', key: 'uploads/image.png' }),
      })
      global.fetch = mockFetch

      const images: Base64Image[] = [
        {
          dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          mimeType: 'image/png',
          data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        },
        {
          dataUrl: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          mimeType: 'image/jpeg',
          data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        },
      ]

      const uploadMap = await uploadBase64Images(images)

      expect(uploadMap.size).toBe(2)
      expect(mockFetch).toHaveBeenCalledTimes(2)
      expect(uploadMap.get('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==')).toBeDefined()
      expect(uploadMap.get('data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==')).toBeDefined()
    })

    it('should handle empty array', async () => {
      const uploadMap = await uploadBase64Images([])

      expect(uploadMap.size).toBe(0)
    })

    it('should throw error if upload fails', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Upload failed' }),
      })
      global.fetch = mockFetch

      const images: Base64Image[] = [
        {
          dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          mimeType: 'image/png',
          data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        },
      ]

      await expect(uploadBase64Images(images)).rejects.toThrow()
    })
  })

  describe('replaceBase64WithUrls', () => {
    it('should replace all base64 URLs with uploaded URLs', () => {
      const html = `
        <p>Text before</p>
        <img src="data:image/png;base64,ABC123" alt="image1" />
        <p>Text between</p>
        <img src="data:image/jpeg;base64,XYZ789" alt="image2" />
        <p>Text after</p>
      `

      const uploadMap = new Map<string, UploadResult>([
        ['data:image/png;base64,ABC123', { url: 'https://storage.com/img1.png', key: 'uploads/img1.png' }],
        ['data:image/jpeg;base64,XYZ789', { url: 'https://storage.com/img2.jpg', key: 'uploads/img2.jpg' }],
      ])

      const result = replaceBase64WithUrls(html, uploadMap)

      expect(result).toContain('https://storage.com/img1.png')
      expect(result).toContain('https://storage.com/img2.jpg')
      expect(result).not.toContain('data:image/png;base64,ABC123')
      expect(result).not.toContain('data:image/jpeg;base64,XYZ789')
    })

    it('should handle special regex characters in base64 data', () => {
      const html = '<img src="data:image/png;base64,ABC+/123==" />'
      const uploadMap = new Map<string, UploadResult>([
        ['data:image/png;base64,ABC+/123==', { url: 'https://storage.com/img.png', key: 'uploads/img.png' }],
      ])

      const result = replaceBase64WithUrls(html, uploadMap)

      expect(result).toContain('https://storage.com/img.png')
      expect(result).not.toContain('data:image/png;base64,ABC+/123==')
    })

    it('should not modify HTML if no matches found', () => {
      const html = '<p>No images here</p>'
      const uploadMap = new Map<string, UploadResult>()

      const result = replaceBase64WithUrls(html, uploadMap)

      expect(result).toBe(html)
    })
  })

  describe('integration test', () => {
    it('should extract, upload, and replace base64 images in complete workflow', async () => {
      const mockFetch = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ url: 'https://storage.com/img1.png', key: 'uploads/img1.png' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ url: 'https://storage.com/img2.jpg', key: 'uploads/img2.jpg' }),
        })
      global.fetch = mockFetch

      const originalHtml = `
        <h1>Article Title</h1>
        <p>Introduction text</p>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="First image" />
        <p>Middle text</p>
        <img src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="Second image" />
        <p>Conclusion</p>
      `

      const base64Images = extractBase64Images(originalHtml)
      expect(base64Images).toHaveLength(2)

      const uploadMap = await uploadBase64Images(base64Images)
      expect(uploadMap.size).toBe(2)

      const processedHtml = replaceBase64WithUrls(originalHtml, uploadMap)

      expect(processedHtml).toContain('https://storage.com/img1.png')
      expect(processedHtml).toContain('https://storage.com/img2.jpg')
      expect(processedHtml).not.toContain('data:image/png;base64,')
      expect(processedHtml).not.toContain('data:image/jpeg;base64,')
      expect(processedHtml).toContain('<h1>Article Title</h1>')
      expect(processedHtml).toContain('<p>Introduction text</p>')
    })
  })
})
