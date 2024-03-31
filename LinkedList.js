const Node = require( './Node');

module.exports = class LinkedList {
    constructor(head) {
        this.head = head;
    }

    append(key, value) {
        let ptr = this.head;
        while (ptr.nextNode != null) {
            ptr = ptr.nextNode;
        }
        ptr.nextNode = new Node(key, value);
    }

    prepend(key, value) {
        const newNode = new Node(key, value);
        newNode.nextNode = this.head;
        this.head = newNode;
    }

    size() {
        let count = 0;
        let ptr = this.head;
        while (ptr != null) {
            count += 1;
            ptr = ptr.nextNode;
        }
        return count;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        let ptr = this.head;
        while (ptr.nextNode != null) {
            ptr = ptr.nextNode;
        }
        return ptr;
    }

    at(index) {
        let count = 0;
        let ptr = this.head;
        while (count != index && ptr != null) {
            count += 1;
            ptr = ptr.nextNode;
        }
        return ptr;
    }

    pop() {
        let beforePtr;
        let ptr = this.head;
        while (ptr.nextNode != null) {
            beforePtr = ptr;
            ptr = ptr.nextNode;
        }
        beforePtr.nextNode = null;
    }

    contains(key) {
        let ptr = this.head;
        while (ptr != null) {
            if (ptr.key === key) {
                return true;
            }
            ptr = ptr.nextNode;
        }
        return false;
    }

    find(key) {
        let index = 0;
        let ptr = this.head;
        while (ptr != null) {
            if (ptr.key === key) {
                return index;
            }
            index += 1;
            ptr = ptr.nextNode;
        }
        return null
    }

    toString() {
        let ptr = this.head;
        let result = '';
        while (ptr != null) {
            result += `( ${ptr.key}, ${ptr.value} ) -> `;
            ptr = ptr.nextNode;
        }
        return result + 'null';
    }

    insertAt(key, value, index) {
        const listSize = this.size();

        if (index > listSize || index < 0) {
            return
        }

        if (index === 0) {
            this.prepend(key, value);
            return
        }

        if (index === listSize) {
            this.append(key, value);
            return
        }

        const currentNode = this.at(index);
        const newNode = new Node(key, value, currentNode);
        let ptr = this.head;
        let count = 0;
        
        while (count != index - 1 && ptr != null) {
            count += 1;
            ptr = ptr.nextNode;
        }
        ptr.nextNode = newNode;      
    }

    removeAt(index) {
        const listSize = this.size();

        if (index > listSize || index < 0) {
            return
        }

        if (index === 0) {
            this.head = this.head.nextNode;
            return
        }

        if (index === listSize) {
            this.pop();
            return
        }

        const currentNode = this.at(index);
        let ptr = this.head;
        let count = 0;
        while(count != index - 1) {
            count += 1;
            ptr = ptr.nextNode;
        }
        ptr.nextNode = currentNode.nextNode;
    }

}