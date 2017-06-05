/*
TODO: Removed keep-aspect-ratio from pleier, make it work later
        let aspectRatio = 16 / 9;

        // Maybe add some sort of debounce, but without adding a dependency
        const resizeWithAspectRatio = () => {
            if (options.height) {
                const w = Math.round(this.elm[0].clientHeight * aspectRatio);
                this.elm.css('width', convertToUnits(w));

            } else if (options.width) {
                const h = Math.round(this.elm[0].clientWidth / aspectRatio);
                this.elm.css('height', convertToUnits(h));
            }
        };

        if (this.attrs.hasOwnProperty('keepAspectRatio')) {

            // If aspect ratio is a string like '16:9', set the proper variable.
            const aspectMatch = this.attrs.keepAspectRatio.match(/^(\d+):(\d+)$/);
            if (aspectMatch) {
                aspectRatio = aspectMatch[1] / aspectMatch[2];
            }

            angular.element(window).bind('resize', resizeWithAspectRatio);
            // If the window or the element size changes, resize the element
            let unit = 0;
            this.scope.$watch(() => {
                let newUnit = 0;
                if (options.height) {
                    newUnit = this.elm[0].clientHeight;
                } else {
                    newUnit = this.elm[0].clientWidth;
                }
                if (unit !== newUnit && newUnit !== 0) {
                    setTimeout(() => {
                        this.scope.$apply(resizeWithAspectRatio);
                    });
                    unit = newUnit;
                }
            });

        }
        */
