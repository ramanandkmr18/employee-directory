/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('EmployeeDirectory.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',  
 
 
    afterRendererWestNavPanel:function(){
		var treelist = this.lookupReference('treelist'),
            ct = this.lookupReference('treelistContainer'); 
			
        treelist.setExpanderFirst(false);
        treelist.setUi('nav');
        treelist.setHighlightPath(true);
		ct.addCls('treelist-with-nav'); 

        if (Ext.isIE8) {
            this.repaintList(treelist);
        }
	},
	afterRendererGreetings:function(panel){
		
		var myDate = new Date();
		var hrs = myDate.getHours();

		var greet;

		if (hrs < 12)
			greet = 'Good Morning';
		else if (hrs >= 12 && hrs <= 17)
			greet = 'Good Afternoon';
		else if (hrs >= 17 && hrs <= 24)
			greet = 'Good Evening';
		
		panel.down("#greetingButton").setText(greet +"    Pavan"); 
		
	},
    onToggleMicro: function(button, pressed) {
        var treelist = this.lookupReference('treelist'), 
            ct = treelist.ownerCt; 
			
        treelist.setMicro(pressed);

        if (pressed) { 
            this.oldWidth = ct.width;
            ct.setWidth(44);
        }
        else {
            ct.setWidth(this.oldWidth);
            navBtn.enable();
        }

        // IE8 has an odd bug with handling font icons in pseudo elements;
        // it will render the icon once and not update it when something
        // like text color is changed via style addition or removal.
        // We have to force icon repaint by adding a style with forced empty
        // pseudo element content, (x-sync-repaint) and removing it back to work
        // around this issue.
        // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
        // and this: https://github.com/twbs/bootstrap/issues/13863
        if (Ext.isIE8) {
            this.repaintList(treelist, pressed);
        }
    },

    onToggleNav: function(button, pressed) {
        var treelist = this.lookupReference('treelist'),
            ct = this.lookupReference('treelistContainer');

        treelist.setExpanderFirst(!pressed);
        treelist.setUi(pressed ? 'nav' : null);
        treelist.setHighlightPath(pressed);
        ct[pressed ? 'addCls' : 'removeCls']('treelist-with-nav');

        if (Ext.isIE8) {
            this.repaintList(treelist);
        }
    },

    repaintList: function(treelist, microMode) {
        treelist.getStore().getRoot().cascade(function(node) {
            var item, toolElement;

            item = treelist.getItem(node);

            if (item && item.isTreeListItem) {
                if (microMode) {
                    toolElement = item.getToolElement();

                    if (toolElement && toolElement.isVisible(true)) {
                        toolElement.syncRepaint();
                    }
                }
                else {
                    if (item.element.isVisible(true)) {
                        item.iconElement.syncRepaint();
                        item.expanderElement.syncRepaint();
                    }
                }
            }
        });
    }
});
