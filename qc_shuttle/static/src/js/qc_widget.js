odoo.define('qc_shuttle.qc_widget', function (require) { 
    "use strict";
  
    var AbstractField = require('web.AbstractField');
    var FieldRegistry = require('web.field_registry');
    var rpc = require('web.rpc');
    var session = require('web.session');
    var core = require('web.core');
    var qweb = core.qweb;
    var FormView = require('web.FormView');
    
    // Membuat object untuk widget kemudian di extend
    var QcWidget = AbstractField.extend({
        template: 'WidgetQcTemplate', // hubungkan ke template yang sudah dibuat agar widget dapat digunakan

        // membuat events untuk button dengan memanggil class dari button dan memberikan function untuk button
        events: {
            'click .button_tambah_snap': '_onClickButton',
        },
        
        // Membuat logika menggunakan jquery dari function yang sudah dibuat untuk mengembalikan nilai true jika checkbox di centang
        // dan nilai false apabila checkbox tidak dicentang
        _onClickButton: function () {
            var self = this;
            var deret_value = $('.deret_value').val();
            var mesin_produksi_id = $('.mesin_produksi_id').val();
            var putus_lusi = $('.putus_lusi').prop("checked");
            var putus_pakan = $('.putus_pakan').prop("checked");
            var bendera_merah = $('.bendera_merah').prop("checked");
            var ambrol = $('.ambrol').prop("checked");
            var dedel = $('.dedel').prop("checked");
            var hb = $('.hb').prop("checked");
            var naik_beam = $('.naik_beam').prop("checked");
            var oh = $('.oh').prop("checked");
            var preventif = $('.preventif').prop("checked");
            var lain_lain = $('.lain_lain').val();
                
            // Ngecek ouput dari data yang di inputkan apakah sudah sesuai atau belum pakek console.log
            console.log('deret_value :', deret_value);
            console.log('mesin_produksi_id:', mesin_produksi_id);
            console.log('putus_lusi:', putus_lusi);
            console.log('putus_pakan:', putus_pakan);
            console.log('bendera_merah:', bendera_merah);
            console.log('ambrol:', ambrol);
            console.log('dedel:', dedel);
            console.log('hb:', hb);
            console.log('naik_beam:', naik_beam);
            console.log('oh:', oh);
            console.log('preventif:', preventif);
            console.log('lain_lain:', lain_lain);
            // 

            // function saveDataSnap yang digunakan untuk memanggil metode saveDataSnap dengan objek parameter yang sudah ditentukan
            this.saveDataSnap({
                deret_value: deret_value,
                mesin_produksi_id: mesin_produksi_id,
                putus_lusi: putus_lusi,
                putus_pakan: putus_pakan,
                bendera_merah: bendera_merah,
                ambrol: ambrol,
                dedel: dedel,
                hb: hb,
                naik_beam: naik_beam,
                oh: oh,
                preventif: preventif,
                lain_lain: lain_lain,
            });
        },
        
         saveDataSnap: function (data) {
            var self = this;
            rpc.query({
                model: 'snap.qc.line',
                method: 'create',
                args: [data],
            }).then(function (result) {
                console.log('Berhasil Simpan Data :) :', result);
            }).catch(function (error) {
                console.error('Gagal Menyimpan Data :( :', error);
            });
         },
         
        //  digunakan untuk merender ulang elemen DOM yang terkait dengan widget jika widget tersebut tidak dalam mode read-only.
        _render: function() {
            var self = this;
            if (!this.get('effective_readonly')) {
                this.$el.html(qweb.render('WidgetQcTemplate', {widget: self}));
            }
        },
    });
    
    // Mendaftarkan widget yang sudah dibuat agar dapat digunakan
    FieldRegistry.add('qc_widget', QcWidget);
    
    // Mengembalikan widget yang sudah di daftarkan agar dapat digunakan
    return QcWidget;
});
