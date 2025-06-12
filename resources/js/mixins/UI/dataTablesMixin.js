export default {
    data: () => ({
        headerObserver: {},
        minWidth: 0,
        windowWidth: window.innerWidth,
        numberOfCells: 0,
    }),
    mounted() {
        this.calculateMinWidth();
    },
    methods: {
        setTableWidth(numberOfCells) {
            if (this.windowWidth !== window.innerWidth) {
                this.calculateBreakPoint();
            }
            if (numberOfCells <= this.calculateBreakPoint()) {
                var calcWidth = this.calculateTableCellWidth(numberOfCells);
                this.cellWidth = calcWidth;
                this.setTableCellWidthForCells(this.cellWidth);
            } else {
                this.removeTdWidths();
            }
            var newWidth = numberOfCells * this.cellWidth;
            this.fixedWidth = newWidth;
            var table = this.getTableFromRef();
            table.style.width = this.fixedWidth + "px";
            document.getElementsByClassName('v-data-table__thead')[0].style.width = this.fixedWidth + 'px';
        },
        calculateTableCellWidth(numberOfCells) {
            this.calculateMinWidth();
            return this.minWidth/numberOfCells;
        },
        calculateMinWidth() {
            if (this.collapsedFilter) {
                this.minWidth = this.windowWidth;
            } else {
                this.minWidth = this.windowWidth * 0.8;
            }
        },
        calculateBreakPoint() {
            this.calculateMinWidth();
            return this.minWidth/100;
        },
        setTableCellWidthForCells(tableCellWidth) {
            var table = this.getTableFromRef();
            var tableTd = table.getElementsByTagName('td');
            for (var i = 0; i < tableTd.length; i++) {
                var td = tableTd[i];
                td.style.width = tableCellWidth + 'px';
            }
        },
        handleTableObserver() {
            const targetNode = document.getElementsByClassName('v-data-table__thead')[0];
            if (!targetNode) { return; }
            const config = { attributes: true, childList: true, subtree: true};
            const self = this;
            const callback = function(mutationsList, observer) {
                if (!this.loading) {
                    for(let mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                           if (mutation.target.cells) {
                                self.setTableWidth(mutation.target.cells.length);
                                self.numberOfCells = mutation.target.cells.length;
                           }
                        }
                    }
                }
            };
            this.headerObserver = new MutationObserver(callback);
            this.headerObserver.observe(targetNode, config);
        },
        bodyDynamicStyle() {
            document.body.classList.add("max-content-body");
        },
        headerDynamicStyle() {
            var headerElement = document.getElementById('main-header-menu');
            headerElement.classList.add("fixed-menu-header");
        },
        footerDynamicSyle() {
            var footerElement = document.getElementById('main-footer-block');
            footerElement.classList.add("footer-inherit-width");
        },
        destroyDynamicStyle() {
            var headerElement = document.getElementById('main-header-menu');
            var footerElement = document.getElementById('main-footer-block');
            headerElement.classList.remove("fixed-menu-header");
            footerElement.classList.remove("footer-inherit-width");
            document.body.classList.remove("max-content-body");
        },
        removeTdWidths() {
            var table = this.getTableFromRef();
            var tableTd = table.getElementsByTagName('td');
            for (var i = 0; i < tableTd.length; i++) {
                var td = tableTd[i];
                td.style.width = null;
            }
        },
        getTableFromRef() {
            var table = this.$refs.tableContainer.getElementsByTagName('table')[0];
            return table;
        },
        scrollToBeginningOfPage() {
            window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
            });
        },
        destroyObserver() {
            this.headerObserver.disconnect();
        }
    }
}
