/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EmployeeDirectory.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'EmployeeDirectory.view.main.MainController',
        'EmployeeDirectory.view.main.MainModel',
        'EmployeeDirectory.view.main.List'
    ],
    cls:'west_navigation_cls',
    controller: 'main',
    viewModel: 'main',  
    layout:'border', 
    header: { 
		cls:'',
        items: [{
            xtype: 'button',
            enableToggle: true, 
			cls: 'accolite-logo',
			height:40,
			width:'15%' ,
			padding:'0 30 0 0'
        },{
            xtype: 'button',
            enableToggle: true, 
			iconCls: 'icon-list',
			height:40,
			width:'5%',
            toggleHandler: 'onToggleMicro'
        },{
			xtype:'tbspacer',
			width: '74%' //change percentage to desired button position 
	   },
	   {
			xtype: 'splitbutton',
            cls:'login-user-pic', 
			height:40,
			width:'5%',
            enableToggle: true
	   }]
    },
    items: [{
        region: 'west',
        width: 250,
        split: true,		
        reference: 'treelistContainer',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        scrollable: 'y',
        items: [{
            xtype: 'treelist',
            reference: 'treelist',
            bind: '{navItems}'
        }],
		listeners:{
			afterrender:'afterRendererWestNavPanel'
		}
    }, {
        region: 'center',
        bodyPadding: 10,
        bind: {
            html: '{selectionText}'
        },
		layout:'border',
		xtype:'container',
		items:[{
			region: 'north',
			height:100,
			border:0,			
			layout:'center', 
			cls:'greeting-cls',
			items:[{
				xtype:'button',
				itemId:'greetingButton'	,
				height:70
			}], 
			listeners:{
				afterrender:'afterRendererGreetings'
			}
			
		},{
			region: 'center',
			xtype:'tabpanel',
			ui: 'navigation',
			tabBar: {
				layout: {
					pack: 'center'
				}, 
				border: false
			},

			defaults: {
				iconAlign: 'top',
				bodyPadding: 15
			},

			items: [{
				title: 'Manager',
				glyph: 72,
				html: 'Manager Info'
			}, {
				title: 'Organization',
				glyph: 117,
				html: ' D3 Chart'
			}, {
				title: 'Office',
				glyph: 85,
				html: "Group"
			}]
		}]
    }]
});
