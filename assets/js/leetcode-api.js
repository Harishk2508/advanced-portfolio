/**
 * ================================================================
 * LEETCODE DYNAMIC STATS INTEGRATION
 * Fetches real-time LeetCode problem counts
 * ================================================================ */

class LeetCodeStatsAPI {
    constructor() {
        this.username = 'harishk2514'; // Replace with your username
        this.baseURL = 'https://leetcode-stats-api.herokuapp.com'; // Free API
        this.fallbackURL = 'https://alfa-leetcode-api.onrender.com'; // Backup API
        this.cacheKey = 'leetcode_stats_cache';
        this.cacheExpiry = 30 * 60 * 1000; // 30 minutes
    }

    async fetchLeetCodeStats() {
        try {
            console.log('🔍 Fetching LeetCode stats...');
            
            // Try cached data first
            const cachedData = this.getCachedStats();
            if (cachedData) {
                console.log('📦 Using cached LeetCode stats');
                return cachedData;
            }

            // Fetch fresh data
            let stats = await this.tryFetchFromAPI();
            
            if (!stats) {
                console.warn('⚠️ API failed, using fallback data');
                stats = this.getFallbackStats();
            }

            // Cache the results
            this.cacheStats(stats);
            console.log('✅ LeetCode stats fetched successfully:', stats);
            
            return stats;
        } catch (error) {
            console.error('❌ Error fetching LeetCode stats:', error);
            return this.getFallbackStats();
        }
    }

    async tryFetchFromAPI() {
        const endpoints = [
            `${this.baseURL}/${this.username}`,
            `${this.fallbackURL}/userProfile/${this.username}`,
            `https://leetcode-stats-api.vercel.app/${this.username}`,
            `https://tashif-leetcode-api.hf.space/${this.username}/profile`
        ];

        for (const endpoint of endpoints) {
            try {
                console.log(`🌐 Trying endpoint: ${endpoint}`);
                const response = await fetch(endpoint);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const data = await response.json();
                return this.parseAPIResponse(data);
            } catch (error) {
                console.warn(`❌ Endpoint failed: ${endpoint}`, error.message);
                continue;
            }
        }
        
        return null;
    }

    parseAPIResponse(data) {
        // Handle different API response formats
        if (data.totalSolved !== undefined) {
            // Format 1: Direct totalSolved
            return {
                totalSolved: data.totalSolved,
                easySolved: data.easySolved || 0,
                mediumSolved: data.mediumSolved || 0,
                hardSolved: data.hardSolved || 0,
                ranking: data.ranking || 0,
                acceptanceRate: data.acceptanceRate || 0
            };
        } else if (data.submitStatsGlobal) {
            // Format 2: LeetCode GraphQL response
            const stats = data.submitStatsGlobal.acSubmissionNum;
            return {
                totalSolved: stats.find(s => s.difficulty === 'All')?.count || 0,
                easySolved: stats.find(s => s.difficulty === 'Easy')?.count || 0,
                mediumSolved: stats.find(s => s.difficulty === 'Medium')?.count || 0,
                hardSolved: stats.find(s => s.difficulty === 'Hard')?.count || 0,
                ranking: data.profile?.ranking || 0,
                acceptanceRate: 0
            };
        } else if (data.data) {
            // Format 3: Nested data structure
            return this.parseAPIResponse(data.data);
        }
        
        return null;
    }

    getCachedStats() {
        try {
            const cached = localStorage.getItem(this.cacheKey);
            if (!cached) return null;
            
            const { data, timestamp } = JSON.parse(cached);
            const isExpired = Date.now() - timestamp > this.cacheExpiry;
            
            return isExpired ? null : data;
        } catch (error) {
            return null;
        }
    }

    cacheStats(stats) {
        try {
            const cacheData = {
                data: stats,
                timestamp: Date.now()
            };
            localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
        } catch (error) {
            console.warn('Failed to cache stats:', error);
        }
    }

    getFallbackStats() {
        // Fallback to current static data if APIs fail
        return {
            totalSolved: 640, // Your current count
            easySolved: 280,
            mediumSolved: 300,
            hardSolved: 60,
            ranking: 50000,
            acceptanceRate: 65.5
        };
    }

    // Manual refresh function
    async refreshStats() {
        localStorage.removeItem(this.cacheKey);
        return await this.fetchLeetCodeStats();
    }
}

// Global instance
window.leetCodeAPI = new LeetCodeStatsAPI();
