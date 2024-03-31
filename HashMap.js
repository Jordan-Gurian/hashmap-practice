const Node = require('./Node');
const LinkedList = require('./LinkedList');

module.exports = class HashMap {
    constructor(buckets = Array(16), loadFactor = 0.75) {
        this.buckets = buckets;
        this.loadFactor = loadFactor;
    }

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode = hashCode % this.buckets.length;
        }
        return hashCode;
    }

    set(key, value) {
        if (this.filledBuckets() > this.loadFactor * this.buckets.length) {
            this.buckets.push(...Array(this.buckets.length))
        }
        const hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
          
        const newNode = new Node(key, value);
        if (this.buckets[hashCode] === undefined) {
            this.buckets[hashCode] = new LinkedList(newNode);
        } else {
            if (this.buckets[hashCode].contains(key)) {
                const insertInd = this.buckets[hashCode].find(key)
                this.buckets[hashCode].removeAt(insertInd);
                this.buckets[hashCode].insertAt(key, value, insertInd);
            } else {
                this.buckets[hashCode].append(newNode);
            }
        }
    }

    get(key) {
        const hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        if (this.has(key)) {
            let ptr = this.buckets[hashCode].head
            while (ptr.key != key) {
                ptr = ptr.nextNode;
            }
            return ptr.value;
        } else {
            return null
        }
    }

    has(key) {
        const hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        if (this.buckets[hashCode] === undefined) {
            return false;
        }

        if (this.buckets[hashCode].contains(key)) {
            return true;
        }
        return false;
    }

    remove(key) {
        const hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        if (this.buckets[hashCode] === undefined) {
            return false;
        }
        if (this.buckets[hashCode].contains(key)) {
            const keyInd = this.buckets[hashCode].find(key);
            this.buckets[hashCode].removeAt(keyInd);
            if (this.buckets[hashCode].head === null) {
                this.buckets[hashCode] = undefined;
            }
            return true;
        }
        return false;
    }

    length() {
        let totalLen = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] === undefined) {
                continue;
            }
            totalLen += this.buckets[i].size();
        }
        return totalLen;
    }

    clear() {
        this.buckets = Array(this.buckets.length);
    }

    keys() {
        let keyArr = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] === undefined) {
                continue;
            }
            let ptr = this.buckets[i].head;
            while (ptr != null) {
                keyArr.push(ptr.key);
                ptr = ptr.nextNode;
            }
        }
        return keyArr;
    }

    values() {
        let valueArr = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] === undefined) {
                continue;
            }
            let ptr = this.buckets[i].head;
            while (ptr != null) {
                valueArr.push(ptr.value);
                ptr = ptr.nextNode;
            }
        }
        return valueArr;
    }

    entries() {
        let entryArr = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] === undefined) {
                continue;
            }
            let ptr = this.buckets[i].head;
            while (ptr != null) {
                entryArr.push([ptr.key, ptr.value]);
                ptr = ptr.nextNode;
            }
        }
        return entryArr;
    }

    filledBuckets() {
        let count = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] === undefined) {
                continue;
            }
            count += 1;
        }
        return count;
    }
}