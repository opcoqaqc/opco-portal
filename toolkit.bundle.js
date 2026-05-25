(function() {
  var PIPE_DATA = [{"nps":0.125,"od_mm":10.3,"schedules":{"STD":1.73,"40":1.73,"XS":2.41,"80":2.41}},{"nps":0.25,"od_mm":13.7,"schedules":{"STD":2.24,"40":2.24,"XS":3.02,"80":3.02}},{"nps":0.375,"od_mm":17.1,"schedules":{"STD":2.31,"40":2.31,"XS":3.2,"80":3.2}},{"nps":0.5,"od_mm":21.3,"schedules":{"STD":2.77,"40":2.77,"XS":3.73,"80":3.73,"160":4.75,"XXS":7.47}},{"nps":0.75,"od_mm":26.7,"schedules":{"STD":2.87,"40":2.87,"XS":3.91,"80":3.91,"160":5.56,"XXS":7.82}},{"nps":1.0,"od_mm":33.4,"schedules":{"STD":3.38,"40":3.38,"XS":4.55,"80":4.55,"160":6.35,"XXS":9.09}},{"nps":1.25,"od_mm":42.2,"schedules":{"STD":3.56,"40":3.56,"XS":4.85,"80":4.85,"160":6.35,"XXS":9.7}},{"nps":1.5,"od_mm":48.3,"schedules":{"STD":3.68,"40":3.68,"XS":5.08,"80":5.08,"160":7.14,"XXS":10.2}},{"nps":2.0,"od_mm":60.3,"schedules":{"STD":3.91,"40":3.91,"XS":5.54,"80":5.54,"160":8.74,"XXS":11.1}},{"nps":2.5,"od_mm":73.0,"schedules":{"STD":5.16,"40":5.16,"XS":7.01,"80":7.01,"160":9.52,"XXS":14.0}},{"nps":3.0,"od_mm":88.9,"schedules":{"STD":5.49,"40":5.49,"XS":7.62,"80":7.62,"160":11.1,"XXS":15.2}},{"nps":3.5,"od_mm":102.0,"schedules":{"STD":5.74,"40":5.74,"XS":8.08,"80":8.08}},{"nps":4.0,"od_mm":114.0,"schedules":{"STD":6.02,"40":6.02,"XS":8.56,"80":8.56,"120":11.1,"160":13.5,"XXS":17.1}},{"nps":5.0,"od_mm":141.0,"schedules":{"STD":6.55,"40":6.55,"XS":9.52,"80":9.52,"120":12.7,"160":15.9,"XXS":19.0}},{"nps":6.0,"od_mm":168.0,"schedules":{"STD":7.11,"40":7.11,"XS":11.0,"80":11.0,"120":14.3,"160":18.3,"XXS":21.9}},{"nps":8.0,"od_mm":219.0,"schedules":{"20":6.35,"30":7.04,"STD":8.18,"40":8.18,"60":10.3,"XS":12.7,"80":12.7,"100":15.1,"120":18.3,"140":20.6,"160":23.0,"XXS":22.2}},{"nps":10.0,"od_mm":273.0,"schedules":{"20":6.35,"30":7.8,"STD":9.27,"40":9.27,"60":12.7,"XS":12.7,"80":15.1,"100":18.3,"120":21.4,"140":25.4,"160":28.6,"XXS":25.4}},{"nps":12.0,"od_mm":324.0,"schedules":{"20":6.35,"30":8.38,"STD":9.52,"40":10.3,"60":14.3,"XS":12.7,"80":17.5,"100":21.4,"120":25.4,"140":28.6,"160":33.3,"XXS":25.4}},{"nps":14.0,"od_mm":356.0,"schedules":{"10":6.35,"20":7.92,"30":9.52,"STD":9.52,"40":11.1,"60":15.1,"XS":12.7,"80":19.0,"100":23.8,"120":27.8,"140":31.8,"160":35.7}},{"nps":16.0,"od_mm":406.0,"schedules":{"10":6.35,"20":7.92,"30":9.52,"STD":9.52,"40":12.7,"60":16.7,"XS":12.7,"80":21.4,"100":26.2,"120":31.0,"140":36.5,"160":40.5}},{"nps":18.0,"od_mm":457.0,"schedules":{"10":6.35,"20":7.92,"30":11.1,"STD":9.52,"40":14.3,"60":19.0,"XS":12.7,"80":23.8,"100":29.4,"120":34.9,"140":39.7,"160":45.2}},{"nps":20.0,"od_mm":508.0,"schedules":{"10":6.35,"20":9.52,"30":12.7,"STD":9.52,"40":15.1,"60":20.6,"XS":12.7,"80":26.2,"100":32.5,"120":38.1,"140":44.4,"160":50.0}},{"nps":22.0,"od_mm":559.0,"schedules":{"10":6.35,"20":9.52,"30":12.7,"STD":9.52,"60":22.2,"XS":12.7,"80":28.6,"100":34.9,"120":41.3,"140":47.6,"160":54.0}},{"nps":24.0,"od_mm":610.0,"schedules":{"10":6.35,"20":9.52,"30":14.3,"STD":9.52,"40":17.5,"60":24.6,"XS":12.7,"80":31.0,"100":38.9,"120":46.0,"140":52.4,"160":59.5}},{"nps":30.0,"od_mm":762.0,"schedules":{"10":7.92,"20":12.7,"30":15.9,"STD":9.52,"XS":12.7}},{"nps":32.0,"od_mm":813.0,"schedules":{"10":7.92,"20":12.7,"30":15.9,"STD":9.52,"40":17.5}},{"nps":34.0,"od_mm":864.0,"schedules":{"10":7.92,"20":12.7,"30":15.9,"STD":9.52,"40":17.5}},{"nps":36.0,"od_mm":914.0,"schedules":{"10":7.92,"20":12.7,"30":15.9,"STD":9.52,"40":19.0}},{"nps":42.0,"od_mm":1067.0,"schedules":{"20":12.7,"30":15.9,"STD":9.52,"40":19.0}}];

  // ASME B36.10M companion data — exact inch values (avoids mm→in rounding artefacts)
  var PIPE_INCHES = {"0.125":{"od_in":0.405,"od_mm":10.3,"wt_in":{"STD":0.068,"40":0.068,"XS":0.095,"80":0.095}},"0.25":{"od_in":0.54,"od_mm":13.7,"wt_in":{"STD":0.088,"40":0.088,"XS":0.119,"80":0.119}},"0.375":{"od_in":0.675,"od_mm":17.1,"wt_in":{"STD":0.091,"40":0.091,"XS":0.126,"80":0.126}},"0.5":{"od_in":0.84,"od_mm":21.3,"wt_in":{"STD":0.109,"40":0.109,"XS":0.147,"80":0.147,"160":0.187,"XXS":0.294}},"0.75":{"od_in":1.05,"od_mm":26.7,"wt_in":{"STD":0.113,"40":0.113,"XS":0.154,"80":0.154,"160":0.219,"XXS":0.308}},"1":{"od_in":1.315,"od_mm":33.4,"wt_in":{"STD":0.133,"40":0.133,"XS":0.179,"80":0.179,"160":0.25,"XXS":0.358}},"1.25":{"od_in":1.66,"od_mm":42.2,"wt_in":{"STD":0.14,"40":0.14,"XS":0.191,"80":0.191,"160":0.25,"XXS":0.382}},"1.5":{"od_in":1.9,"od_mm":48.3,"wt_in":{"STD":0.145,"40":0.145,"XS":0.2,"80":0.2,"160":0.281,"XXS":0.4}},"2":{"od_in":2.375,"od_mm":60.3,"wt_in":{"STD":0.154,"40":0.154,"XS":0.218,"80":0.218,"160":0.344,"XXS":0.436}},"2.5":{"od_in":2.875,"od_mm":73,"wt_in":{"STD":0.203,"40":0.203,"XS":0.276,"80":0.276,"160":0.375,"XXS":0.552}},"3":{"od_in":3.5,"od_mm":88.9,"wt_in":{"STD":0.216,"40":0.216,"XS":0.3,"80":0.3,"160":0.438,"XXS":0.6}},"3.5":{"od_in":4,"od_mm":102,"wt_in":{"STD":0.226,"40":0.226,"XS":0.318,"80":0.318}},"4":{"od_in":4.5,"od_mm":114,"wt_in":{"STD":0.237,"40":0.237,"XS":0.337,"80":0.337,"120":0.438,"160":0.531,"XXS":0.674}},"5":{"od_in":5.563,"od_mm":141,"wt_in":{"STD":0.258,"40":0.258,"XS":0.375,"80":0.375,"120":0.5,"160":0.625,"XXS":0.75}},"6":{"od_in":6.625,"od_mm":168,"wt_in":{"STD":0.28,"40":0.28,"XS":0.432,"80":0.432,"120":0.562,"160":0.719,"XXS":0.864}},"8":{"od_in":8.625,"od_mm":219,"wt_in":{"20":0.25,"30":0.277,"STD":0.322,"40":0.322,"60":0.406,"XS":0.5,"80":0.5,"100":0.594,"120":0.719,"140":0.812,"160":0.906,"XXS":0.875}},"10":{"od_in":10.75,"od_mm":273,"wt_in":{"20":0.25,"30":0.307,"STD":0.365,"40":0.365,"60":0.5,"XS":0.5,"80":0.594,"100":0.719,"120":0.844,"140":1,"160":1.125,"XXS":1}},"12":{"od_in":12.75,"od_mm":324,"wt_in":{"20":0.25,"30":0.33,"STD":0.375,"40":0.406,"60":0.562,"XS":0.5,"80":0.688,"100":0.844,"120":1,"140":1.125,"160":1.312,"XXS":1}},"14":{"od_in":14,"od_mm":356,"wt_in":{"10":0.25,"20":0.312,"30":0.375,"STD":0.375,"40":0.438,"60":0.594,"XS":0.5,"80":0.75,"100":0.938,"120":1.094,"140":1.25,"160":1.406}},"16":{"od_in":16,"od_mm":406,"wt_in":{"10":0.25,"20":0.312,"30":0.375,"STD":0.375,"40":0.5,"60":0.656,"XS":0.5,"80":0.844,"100":1.031,"120":1.219,"140":1.438,"160":1.594}},"18":{"od_in":18,"od_mm":457,"wt_in":{"10":0.25,"20":0.312,"30":0.438,"STD":0.375,"40":0.562,"60":0.75,"XS":0.5,"80":0.938,"100":1.156,"120":1.375,"140":1.562,"160":1.781}},"20":{"od_in":20,"od_mm":508,"wt_in":{"10":0.25,"20":0.375,"30":0.5,"STD":0.375,"40":0.594,"60":0.812,"XS":0.5,"80":1.031,"100":1.281,"120":1.5,"140":1.75,"160":1.969}},"22":{"od_in":22,"od_mm":559,"wt_in":{"10":0.25,"20":0.375,"30":0.5,"STD":0.375,"60":0.875,"XS":0.5,"80":1.125,"100":1.375,"120":1.625,"140":1.875,"160":2.125}},"24":{"od_in":24,"od_mm":610,"wt_in":{"10":0.25,"20":0.375,"30":0.562,"STD":0.375,"40":0.688,"60":0.969,"XS":0.5,"80":1.219,"100":1.531,"120":1.812,"140":2.062,"160":2.344}},"30":{"od_in":30,"od_mm":762,"wt_in":{"10":0.312,"20":0.5,"30":0.625,"STD":0.375,"XS":0.5}},"32":{"od_in":32,"od_mm":813,"wt_in":{"10":0.312,"20":0.5,"30":0.625,"STD":0.375,"40":0.688}},"34":{"od_in":34,"od_mm":864,"wt_in":{"10":0.312,"20":0.5,"30":0.625,"STD":0.375,"40":0.688}},"36":{"od_in":36,"od_mm":914,"wt_in":{"10":0.312,"20":0.5,"30":0.625,"STD":0.375,"40":0.75}},"42":{"od_in":42,"od_mm":1067,"wt_in":{"20":0.5,"30":0.625,"STD":0.375,"40":0.75}}};

  var SCH_ORDER = ['10', '20', '30', 'STD', '40', '60', 'XS', '80', '100', '120', '140', '160', 'XXS'];

  var STEEL_DENSITY = 7.85;
  var PIPE_LENGTH = 12;
  // Cap reinforcement modeled as a fixed height × bevel top width (industry standard,
  // matches Dr. Hussain Ali / orient-pipeline reference model).
  var CAP_HEIGHT = 2.65; // mm — typical cap reinforcement height for pipeline butt welds
  // Root + hot pass combined deposit area is largely independent of wall thickness.
  // In standard pipeline practice, root and hot pass are performed back-to-back with
  // the same method/consumable, and together fill the gap region plus a small
  // reinforcement at the root. This area stays roughly constant regardless of how
  // thick the pipe is — the rest is fill+cap with as many passes as needed.
  var ROOT_PASS_AREA = 30.17; // mm² — calibrated against Dr. Hussain Ali reference data
  var WASTE = 1.10;

  // Welding methods catalog: each method has a typical efficiency.
  // Efficiency = (deposited weld metal) / (wire/electrode consumed). Stub loss + spatter included.
  // Calibrated against Dr. Hussain Ali / orient-pipeline supplier reference data.
  var METHODS = {
    'GMAW': {
      label: 'GMAW',
      description: 'Gas Metal Arc Welding (MIG/MAG, STT)',
      efficiency: 0.98
    },
    'FCAW': {
      label: 'FCAW',
      description: 'Flux Cored Arc Welding',
      efficiency: 0.92
    },
    'SMAW': {
      label: 'SMAW',
      description: 'Shielded Metal Arc Welding (stick)',
      efficiency: 0.65
    },
    'GTAW': {
      label: 'GTAW',
      description: 'Gas Tungsten Arc Welding (TIG)',
      efficiency: 0.97
    },
    'SAW': {
      label: 'SAW',
      description: 'Submerged Arc Welding',
      efficiency: 0.99
    }
  };

  // Default method state
  var rootMethod = { method: 'GMAW' };
  var fillMethod = { method: 'FCAW' };

  // Tab switching (top-level)
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.tab-panel');

  for (var ti = 0; ti < tabs.length; ti++) {
    tabs[ti].addEventListener('click', function() {
      var name = this.getAttribute('data-tab');
      for (var t = 0; t < tabs.length; t++) tabs[t].classList.remove('active');
      for (var p = 0; p < panels.length; p++) panels[p].classList.remove('active');
      this.classList.add('active');
      document.getElementById('tab-' + name).classList.add('active');
      if (name === 'welder') renderWelderTable();
      if (name === 'heatinput') initHeatInput();
      if (name === 'ceph') initCePh();
      if (name === 'welders') initWelders();
      if (name === 'torque') initTorque();
      if (name === 'projects') initProjects();
      if (name === 'consumable') {
        var sub = document.querySelector('#tab-consumable .subtab.active');
        if (sub && sub.getAttribute('data-subtab') === 'mto') updateMTOTotals();
      }
    });
  }

  // Sub-tab switching — scoped to the containing tab panel so multiple
  // sub-tab groups (e.g. consumable's single/mto and welder's pipeline/piping)
  // don't interfere with each other.
  var subtabs = document.querySelectorAll('.subtab');
  for (var sti = 0; sti < subtabs.length; sti++) {
    subtabs[sti].addEventListener('click', function() {
      var name = this.getAttribute('data-subtab');
      var container = this.closest('.tab-panel');
      if (!container) return;
      var localSubtabs = container.querySelectorAll('.subtab');
      var localPanels  = container.querySelectorAll('.subtab-panel');
      for (var s = 0; s < localSubtabs.length; s++) localSubtabs[s].classList.remove('active');
      for (var sp = 0; sp < localPanels.length; sp++) localPanels[sp].classList.remove('active');
      this.classList.add('active');
      var panel = container.querySelector('#subtab-' + name);
      if (panel) panel.classList.add('active');
      if (name === 'pipeline') renderWelderTable();
      if (name === 'piping') renderPipingTable();
      if (name === 'piping-w') renderPipingWelderTable();
      if (name === 'mto') updateMTOTotals();
      if (name === 'schtable') renderSchTable();
    });
  }

  function getEfficiency(methodKey) {
    var m = METHODS[methodKey];
    return m ? m.efficiency : 0.85;
  }

  // ===== Pipe SCH table renderer =====
  // Builds a static reference table from PIPE_DATA (mm values, used by calculator)
  // and PIPE_INCHES (matching ASME B36.10M inch values) so cells are exact.
  // Each pipe size occupies two rows: inches (top) and millimetres (bottom).
  var schTableRendered = false;
  function renderSchTable() {
    if (schTableRendered) return;
    schTableRendered = true;
    var theadSch = document.getElementById('sch-thead-schedules');
    var tbody = document.getElementById('sch-tbody');
    if (!theadSch || !tbody) return;

    var COLS = SCH_ORDER.slice();

    theadSch.innerHTML = COLS.map(function(s) {
      var cls = 'sch-th-sch';
      if (s === 'STD') cls += ' sch-std-col';
      if (s === 'XS')  cls += ' sch-xs-col';
      return '<th class="' + cls + '">' + s + '</th>';
    }).join('');

    function fmtNps(nps) {
      var whole = Math.floor(nps);
      var frac = nps - whole;
      var fracStr = '';
      if (Math.abs(frac - 0.125) < 1e-6) fracStr = '1/8';
      else if (Math.abs(frac - 0.25) < 1e-6) fracStr = '1/4';
      else if (Math.abs(frac - 0.375) < 1e-6) fracStr = '3/8';
      else if (Math.abs(frac - 0.5) < 1e-6) fracStr = '1/2';
      else if (Math.abs(frac - 0.625) < 1e-6) fracStr = '5/8';
      else if (Math.abs(frac - 0.75) < 1e-6) fracStr = '3/4';
      else if (Math.abs(frac - 0.875) < 1e-6) fracStr = '7/8';
      if (whole === 0) return fracStr;
      if (fracStr === '') return '' + whole;
      return whole + ' ' + fracStr;
    }

    function fmtIn(v) {
      // Return inch value with trailing zeros trimmed (0.500 → 0.5, 0.375 stays)
      if (v == null) return null;
      var s = String(v);
      if (s.indexOf('.') < 0) return s;
      return s.replace(/0+$/, '').replace(/\.$/, '');
    }

    var html = '';
    PIPE_DATA.forEach(function(pipe) {
      // Single row per pipe size — millimetres only.
      html += '<tr class="sch-row-mm">';
      html += '<td class="sch-col-nps">' + fmtNps(pipe.nps) + '</td>';
      html += '<td class="sch-col-od">' + pipe.od_mm + '</td>';
      COLS.forEach(function(sch) {
        var wt_mm = pipe.schedules[sch];
        var cls = '';
        if (sch === 'STD') cls += ' sch-std-col';
        if (sch === 'XS')  cls += ' sch-xs-col';
        if (wt_mm == null) {
          html += '<td class="sch-cell-empty' + cls + '">—</td>';
        } else {
          html += '<td class="sch-cell-mm' + cls + '">' + wt_mm + '</td>';
        }
      });
      html += '</tr>';
    });
    tbody.innerHTML = html;
  }

  // ===== Welder Performance table renderer =====
  // For each pipe size × schedule, compute the bevel cavity volume per joint
  // (groove area × circumference, cap excluded — matching Hussain reference).
  // Daily output capacity (cm³/day) is divided by joint volume to get joints/day.
  // Re-renders whenever bevel parameters change (root opening, root face, bevel angle).
  function computeJointGrooveVolume_cm3(od_mm, t_mm, r_mm, f_mm, angle_deg) {
    var rootFace = Math.min(f_mm, t_mm * 0.6);
    var halfRad = (angle_deg / 2) * Math.PI / 180;
    var tanHalf = Math.tan(halfRad);
    // Bevel cavity (groove) cross-section area, mm²
    var groove = r_mm * rootFace + r_mm * (t_mm - rootFace) + Math.pow(t_mm - rootFace, 2) * tanHalf;
    var circumference = Math.PI * od_mm; // mm
    var volume_mm3 = groove * circumference;
    return volume_mm3 / 1000; // cm³
  }

  function renderWelderTable() {
    var theadSch = document.getElementById('welder-thead-schedules');
    var tbody = document.getElementById('welder-tbody');
    var avgInput = document.getElementById('welder-avg-rate');
    if (!theadSch || !tbody) return;

    var COLS = SCH_ORDER.slice();

    // Read bevel params from Single pipe size tab
    var r = parseFloat(document.getElementById('ro').value);
    var f = parseFloat(document.getElementById('rf').value);
    var a = parseFloat(document.getElementById('ang').value);
    var avg = parseFloat(avgInput.value) || 410;

    // Build header row
    theadSch.innerHTML = COLS.map(function(s) {
      return '<th class="sch-th-sch">' + s + '</th>';
    }).join('');

    function fmtNps(nps) {
      var whole = Math.floor(nps);
      var frac = nps - whole;
      var fracStr = '';
      if (Math.abs(frac - 0.125) < 1e-6) fracStr = '1/8';
      else if (Math.abs(frac - 0.25) < 1e-6) fracStr = '1/4';
      else if (Math.abs(frac - 0.375) < 1e-6) fracStr = '3/8';
      else if (Math.abs(frac - 0.5) < 1e-6) fracStr = '1/2';
      else if (Math.abs(frac - 0.625) < 1e-6) fracStr = '5/8';
      else if (Math.abs(frac - 0.75) < 1e-6) fracStr = '3/4';
      else if (Math.abs(frac - 0.875) < 1e-6) fracStr = '7/8';
      if (whole === 0) return fracStr;
      if (fracStr === '') return '' + whole;
      return whole + ' ' + fracStr;
    }
    function fmt(n) {
      if (!isFinite(n) || n <= 0) return '—';
      // small numbers: 2 decimals; bigger: 1 decimal; very big: 0
      if (n < 10) return n.toFixed(2);
      if (n < 100) return n.toFixed(1);
      return Math.round(n).toString();
    }

    var html = '';
    // Skip pipe sizes that are too small to be welder-relevant (< 6" in Hussain's table)
    PIPE_DATA.forEach(function(pipe) {
      if (pipe.nps < 6) return; // table starts at NPS 6
      var seam_m = Math.PI * pipe.od_mm / 1000; // m
      html += '<tr class="sch-row-nps">';
      html += '<td class="sch-col-nps">' + fmtNps(pipe.nps) + '</td>';
      html += '<td class="sch-col-od">' + pipe.od_mm + '</td>';
      html += '<td class="sch-col-od">' + seam_m.toFixed(3) + '</td>';
      COLS.forEach(function(sch) {
        var t_mm = pipe.schedules[sch];
        if (t_mm == null) {
          html += '<td class="sch-cell-empty">—</td>';
        } else {
          var vol = computeJointGrooveVolume_cm3(pipe.od_mm, t_mm, r, f, a);
          var jpd = vol > 0 ? avg / vol : 0;
          html += '<td class="welder-cell">' + fmt(jpd) + '</td>';
        }
      });
      html += '</tr>';
    });
    tbody.innerHTML = html;
  }

  // Re-render welder table when daily rate changes
  function bindWelderInputs() {
    var avg = document.getElementById('welder-avg-rate');
    if (avg) avg.addEventListener('input', renderWelderTable);
  }
  bindWelderInputs();

  // ===== Piping welder table (½" – 36") =====
  // Two contexts: Shop (pre-fab area, controlled access) and Field (in-situ on
  // scaffold, position constraints). Same volume model as pipeline welders, but
  // with realistic joint-time model that accounts for fit-up overhead. Pure cm³/day
  // breaks down on small bores because fit-up + tack + position changes dominate
  // (not arc time).
  //
  // Model:
  //   weld_time_per_joint = (joint_volume / daily_cm3) * EFFECTIVE_MIN
  //   joint_time = weld_time + fitup_overhead(OD, context)
  //   joints_per_day = EFFECTIVE_MIN / joint_time
  //
  // Fit-up overhead is OD-dependent and slightly lower in shop (controlled alignment,
  // jigs available) vs field (scaffold + access challenges).
  // EFFECTIVE_MIN = 360 (6 productive hours per shift after lunch/breaks/movement).
  function pipingFitupMin(od_mm, context) {
    var base;
    if (od_mm <= 50)       base = 12;  // ½" – 1.5"
    else if (od_mm <= 100) base = 18;  // 2" – 4"
    else if (od_mm <= 200) base = 25;  // 5" – 8"
    else if (od_mm <= 350) base = 35;  // 10" – 14"
    else if (od_mm <= 600) base = 50;  // 16" – 24"
    else                   base = 70;  // 30"+
    // Shop welder gets a small reduction (controlled alignment, no scaffold)
    if (context === 'shop') return Math.round(base * 0.75);
    return base;
  }
  function pipingJointsPerDay(daily_cm3, vol_cm3, od_mm, context) {
    if (vol_cm3 <= 0 || daily_cm3 <= 0) return 0;
    var EFF_MIN = 360;
    var weld_time = (vol_cm3 / daily_cm3) * EFF_MIN;
    var joint_time = weld_time + pipingFitupMin(od_mm, context);
    return EFF_MIN / joint_time;
  }

  function renderPipingTable() {
    var theadSch = document.getElementById('piping-thead-schedules');
    var tbody = document.getElementById('piping-tbody');
    var shopInput = document.getElementById('piping-shop-rate');
    var fieldInput = document.getElementById('piping-field-rate');
    if (!theadSch || !tbody) return;

    var COLS = SCH_ORDER.slice();

    var r = parseFloat(document.getElementById('ro').value);
    var f = parseFloat(document.getElementById('rf').value);
    var a = parseFloat(document.getElementById('ang').value);
    var matSel = document.getElementById('pp-est-mat');
    var matVal = (matSel && matSel.value) || 'CS';
    var mult = MATERIAL_MULT[matVal] || 1.0;
    var shopRate  = (parseFloat(shopInput.value)  || 280) * mult;
    var fieldRate = (parseFloat(fieldInput.value) || 210) * mult;

    // Update header indicator with current material
    var thUnit = document.getElementById('piping-th-unit');
    if (thUnit) {
      var matLabel = (matVal === 'SS') ? 'SS / High alloy' : 'CS / Low alloy';
      thUnit.textContent = '(Shop / Field, ' + matLabel + ')';
    }

    theadSch.innerHTML = COLS.map(function(s) {
      return '<th class="sch-th-sch">' + s + '</th>';
    }).join('');

    function fmtNps(nps) {
      var whole = Math.floor(nps);
      var frac = nps - whole;
      var fracStr = '';
      if (Math.abs(frac - 0.125) < 1e-6) fracStr = '1/8';
      else if (Math.abs(frac - 0.25) < 1e-6) fracStr = '1/4';
      else if (Math.abs(frac - 0.375) < 1e-6) fracStr = '3/8';
      else if (Math.abs(frac - 0.5) < 1e-6) fracStr = '1/2';
      else if (Math.abs(frac - 0.625) < 1e-6) fracStr = '5/8';
      else if (Math.abs(frac - 0.75) < 1e-6) fracStr = '3/4';
      else if (Math.abs(frac - 0.875) < 1e-6) fracStr = '7/8';
      if (whole === 0) return fracStr;
      if (fracStr === '') return '' + whole;
      return whole + ' ' + fracStr;
    }
    function fmt(n) {
      if (!isFinite(n) || n <= 0) return '—';
      if (n < 10) return n.toFixed(2);
      if (n < 100) return n.toFixed(1);
      return Math.round(n).toString();
    }

    var html = '';
    PIPE_DATA.forEach(function(pipe) {
      if (pipe.nps < 0.5 || pipe.nps > 36) return;
      var seam_m = Math.PI * pipe.od_mm / 1000;

      // Row 1: Shop — NPS, OD, Seam are merged across both rows
      html += '<tr class="piping-row-shop">';
      html += '<td class="sch-col-nps" rowspan="2">' + fmtNps(pipe.nps) + '</td>';
      html += '<td class="sch-col-od" rowspan="2">' + pipe.od_mm + '</td>';
      html += '<td class="sch-col-od" rowspan="2">' + seam_m.toFixed(3) + '</td>';
      COLS.forEach(function(sch) {
        var t_mm = pipe.schedules[sch];
        if (t_mm == null) {
          html += '<td class="sch-cell-empty">—</td>';
        } else {
          var vol = computeJointGrooveVolume_cm3(pipe.od_mm, t_mm, r, f, a);
          html += '<td class="piping-cell piping-shop">' + fmt(pipingJointsPerDay(shopRate, vol, pipe.od_mm, 'shop')) + '</td>';
        }
      });
      html += '</tr>';

      // Row 2: Field
      html += '<tr class="piping-row-field">';
      COLS.forEach(function(sch) {
        var t_mm = pipe.schedules[sch];
        if (t_mm == null) {
          html += '<td class="sch-cell-empty">—</td>';
        } else {
          var vol = computeJointGrooveVolume_cm3(pipe.od_mm, t_mm, r, f, a);
          html += '<td class="piping-cell piping-field">' + fmt(pipingJointsPerDay(fieldRate, vol, pipe.od_mm, 'field')) + '</td>';
        }
      });
      html += '</tr>';
    });
    tbody.innerHTML = html;
  }

  function bindPipingInputs() {
    var s = document.getElementById('piping-shop-rate');
    var f = document.getElementById('piping-field-rate');
    if (s) s.addEventListener('input', renderPipingTable);
    if (f) f.addEventListener('input', renderPipingTable);
  }
  bindPipingInputs();

  // ===== Quick joint estimator (Pipeline + Piping) =====
  // Reuses computeJointGrooveVolume_cm3 + bevel params from Single pipe size tab.
  // Pipeline: joints/day = daily_cm3 / vol_cm3 (pure rate, no fit-up overhead)
  // Piping: joints/day = pipingJointsPerDay() (includes fit-up time, 360 min shift)
  function fmtNpsLabel(nps) {
    var whole = Math.floor(nps);
    var frac = nps - whole;
    var fracStr = '';
    if (Math.abs(frac - 0.125) < 1e-6) fracStr = '1/8';
    else if (Math.abs(frac - 0.25) < 1e-6) fracStr = '1/4';
    else if (Math.abs(frac - 0.375) < 1e-6) fracStr = '3/8';
    else if (Math.abs(frac - 0.5) < 1e-6) fracStr = '1/2';
    else if (Math.abs(frac - 0.625) < 1e-6) fracStr = '5/8';
    else if (Math.abs(frac - 0.75) < 1e-6) fracStr = '3/4';
    else if (Math.abs(frac - 0.875) < 1e-6) fracStr = '7/8';
    var label = '';
    if (whole === 0) label = fracStr;
    else if (fracStr === '') label = '' + whole;
    else label = whole + ' ' + fracStr;
    return label + '"';
  }
  function fmtEstNum(n, decimals) {
    if (!isFinite(n) || n <= 0) return '—';
    if (decimals != null) return n.toFixed(decimals);
    if (n < 10) return n.toFixed(2);
    if (n < 100) return n.toFixed(1);
    return Math.round(n).toString();
  }
  function populateEstimatorNPS(selectId, minNps) {
    var sel = document.getElementById(selectId);
    if (!sel) return;
    var prev = sel.value;
    sel.innerHTML = '';
    PIPE_DATA.forEach(function(pipe) {
      if (minNps != null && pipe.nps < minNps) return;
      var opt = document.createElement('option');
      opt.value = String(pipe.nps);
      opt.textContent = fmtNpsLabel(pipe.nps) + '  (OD ' + pipe.od_mm + ' mm)';
      sel.appendChild(opt);
    });
    // Restore previous selection if still valid; otherwise default to a sensible size
    if (prev && Array.from(sel.options).some(function(o){ return o.value === prev; })) {
      sel.value = prev;
    } else {
      // Pipeline: default to 12", Piping: default to 4"
      var defaultNps = (minNps != null && minNps >= 6) ? '12' : '4';
      if (Array.from(sel.options).some(function(o){ return o.value === defaultNps; })) {
        sel.value = defaultNps;
      }
    }
  }
  function populateEstimatorSCH(npsSelectId, schSelectId) {
    var npsSel = document.getElementById(npsSelectId);
    var schSel = document.getElementById(schSelectId);
    if (!npsSel || !schSel) return;
    var nps = parseFloat(npsSel.value);
    var pipe = PIPE_DATA.find(function(p) { return Math.abs(p.nps - nps) < 1e-6; });
    var prev = schSel.value;
    schSel.innerHTML = '';
    if (!pipe) return;
    SCH_ORDER.forEach(function(sch) {
      if (pipe.schedules[sch] != null) {
        var opt = document.createElement('option');
        opt.value = sch;
        opt.textContent = sch + '  (' + pipe.schedules[sch] + ' mm)';
        schSel.appendChild(opt);
      }
    });
    // Restore or default
    if (prev && Array.from(schSel.options).some(function(o){ return o.value === prev; })) {
      schSel.value = prev;
    } else if (pipe.schedules['STD'] != null) {
      schSel.value = 'STD';
    } else if (pipe.schedules['40'] != null) {
      schSel.value = '40';
    }
  }
  // Material multiplier for welder rate
  // CS / Low alloy = baseline; SS / High alloy slower (more interpass cleaning, GTAW root)
  var MATERIAL_MULT = { 'CS': 1.0, 'SS': 0.9 };

  function updatePipelineEstimator() {
    var npsSel = document.getElementById('pl-est-nps');
    var schSel = document.getElementById('pl-est-sch');
    if (!npsSel || !schSel) return;
    var nps = parseFloat(npsSel.value);
    var pipe = PIPE_DATA.find(function(p) { return Math.abs(p.nps - nps) < 1e-6; });
    if (!pipe) return;
    var t_mm = pipe.schedules[schSel.value];
    if (t_mm == null) return;
    var r = parseFloat(document.getElementById('ro').value);
    var f = parseFloat(document.getElementById('rf').value);
    var a = parseFloat(document.getElementById('ang').value);
    var rate = parseFloat(document.getElementById('welder-avg-rate').value) || 410;
    var vol = computeJointGrooveVolume_cm3(pipe.od_mm, t_mm, r, f, a);
    var jpd = vol > 0 ? rate / vol : 0;
    var hours = jpd > 0 ? 8 / jpd : 0;  // 8-hour shift
    document.getElementById('pl-est-vol').textContent  = fmtEstNum(vol);
    document.getElementById('pl-est-jpd').textContent  = fmtEstNum(jpd);
    document.getElementById('pl-est-time').textContent = fmtEstNum(hours);
  }
  function updatePipingEstimator() {
    var npsSel = document.getElementById('pp-est-nps');
    var schSel = document.getElementById('pp-est-sch');
    var matSel = document.getElementById('pp-est-mat');
    var ctxSel = document.getElementById('pp-est-ctx');
    if (!npsSel || !schSel || !matSel || !ctxSel) return;
    var nps = parseFloat(npsSel.value);
    var pipe = PIPE_DATA.find(function(p) { return Math.abs(p.nps - nps) < 1e-6; });
    if (!pipe) return;
    var t_mm = pipe.schedules[schSel.value];
    if (t_mm == null) return;
    var r = parseFloat(document.getElementById('ro').value);
    var f = parseFloat(document.getElementById('rf').value);
    var a = parseFloat(document.getElementById('ang').value);
    var shopRate  = parseFloat(document.getElementById('piping-shop-rate').value)  || 280;
    var fieldRate = parseFloat(document.getElementById('piping-field-rate').value) || 210;
    var ctx = ctxSel.value; // 'shop' | 'field'
    var mult = MATERIAL_MULT[matSel.value] || 1.0;
    var rate = ((ctx === 'shop') ? shopRate : fieldRate) * mult;
    var vol = computeJointGrooveVolume_cm3(pipe.od_mm, t_mm, r, f, a);
    var jpd = pipingJointsPerDay(rate, vol, pipe.od_mm, ctx);
    // Time per joint = (weld_time + fitup) in min, productive shift 360 min
    var weld_time_min = vol > 0 ? (vol / rate) * 360 : 0;
    var joint_time_min = weld_time_min + pipingFitupMin(pipe.od_mm, ctx);
    var hours = joint_time_min / 60;
    document.getElementById('pp-est-vol').textContent  = fmtEstNum(vol);
    document.getElementById('pp-est-jpd').textContent  = fmtEstNum(jpd);
    document.getElementById('pp-est-time').textContent = fmtEstNum(hours);
  }
  function initEstimators() {
    // Pipeline estimator: NPS >= 6 (matches table range)
    populateEstimatorNPS('pl-est-nps', 6);
    populateEstimatorSCH('pl-est-nps', 'pl-est-sch');
    // Piping estimator: all sizes
    populateEstimatorNPS('pp-est-nps', null);
    populateEstimatorSCH('pp-est-nps', 'pp-est-sch');

    // Bind change handlers
    var plNps = document.getElementById('pl-est-nps');
    var plSch = document.getElementById('pl-est-sch');
    if (plNps) plNps.addEventListener('change', function() {
      populateEstimatorSCH('pl-est-nps', 'pl-est-sch');
      updatePipelineEstimator();
    });
    if (plSch) plSch.addEventListener('change', updatePipelineEstimator);

    var ppNps = document.getElementById('pp-est-nps');
    var ppSch = document.getElementById('pp-est-sch');
    var ppMat = document.getElementById('pp-est-mat');
    var ppCtx = document.getElementById('pp-est-ctx');
    if (ppNps) ppNps.addEventListener('change', function() {
      populateEstimatorSCH('pp-est-nps', 'pp-est-sch');
      updatePipingEstimator();
    });
    if (ppSch) ppSch.addEventListener('change', updatePipingEstimator);
    if (ppMat) ppMat.addEventListener('change', function() {
      updatePipingEstimator();
      renderPipingTable();
    });
    if (ppCtx) ppCtx.addEventListener('change', updatePipingEstimator);

    // Re-run when bevel params or daily rates change
    var deps = ['ro', 'rf', 'ang', 'welder-avg-rate', 'piping-shop-rate', 'piping-field-rate'];
    deps.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function() {
        updatePipelineEstimator();
        updatePipingEstimator();
      });
    });

    // Initial calculation
    updatePipelineEstimator();
    updatePipingEstimator();
  }
  initEstimators();

  // ===== Heat Input calculator =====
  // HI = (V × I × η × 60) / (TS × 1000)  [kJ/mm], TS in mm/min
  // Process efficiency η per AWS D1.1 / EN 1011-1.
  // Pass-by-pass table with multiple passes; reverse calc for required travel speed.
  var HI_PROCESS_DEFAULTS = {
    'SMAW':       { eff: 0.80, label: 'SMAW' },
    'FCAW':       { eff: 0.80, label: 'FCAW' },
    'GMAW-SPRAY': { eff: 0.80, label: 'GMAW spray' },
    'GMAW-STT':   { eff: 0.85, label: 'GMAW STT' },
    'GTAW':       { eff: 0.60, label: 'GTAW' },
    'SAW':        { eff: 1.00, label: 'SAW' }
  };
  var hiPasses = [
    { id: 1, process: 'GTAW', name: 'Root',   v: 9.5, a: 90,  ts: 52 },
    { id: 2, process: 'GTAW', name: 'Hot',    v: 11,  a: 165, ts: 86 },
    { id: 3, process: 'SMAW', name: 'Fill-1', v: 23,  a: 85,  ts: 53 },
    { id: 4, process: 'SMAW', name: 'Cap-1',  v: 23,  a: 90,  ts: 75 }
  ];
  var hiNextId = 5;
  var hiInitialised = false;

  function hiTsToMmPerMin(ts, unit) {
    if (unit === 'cm/min') return ts * 10;
    if (unit === 'in/min') return ts * 25.4;
    return ts; // mm/min
  }
  function hiTsFromMmPerMin(ts_mm, unit) {
    if (unit === 'cm/min') return ts_mm / 10;
    if (unit === 'in/min') return ts_mm / 25.4;
    return ts_mm;
  }
  function hiCalcGross(v, a, ts_mm) {
    if (!(v > 0) || !(a > 0) || !(ts_mm > 0)) return 0;
    return (v * a * 60) / (ts_mm * 1000);
  }
  function hiCalcNet(v, a, ts_mm, eff) {
    return hiCalcGross(v, a, ts_mm) * eff;
  }
  function hiGetRange() {
    var rangeSel = document.getElementById('hi-range');
    var val = rangeSel.value;
    if (val === 'custom') {
      return {
        min: parseFloat(document.getElementById('hi-custom-min').value) || 0,
        max: parseFloat(document.getElementById('hi-custom-max').value) || Infinity
      };
    }
    var opt = rangeSel.options[rangeSel.selectedIndex];
    return {
      min: parseFloat(opt.getAttribute('data-min')),
      max: parseFloat(opt.getAttribute('data-max'))
    };
  }
  function hiGetEffForProcess(processKey) {
    var entry = HI_PROCESS_DEFAULTS[processKey];
    return (entry && entry.eff) || 0.80;
  }
  function hiBuildProcessSelect(currentValue) {
    var html = '<select class="hi-pass-process">';
    Object.keys(HI_PROCESS_DEFAULTS).forEach(function(key) {
      var sel = (key === currentValue) ? ' selected' : '';
      html += '<option value="' + key + '"' + sel + '>' + HI_PROCESS_DEFAULTS[key].label + ' (η = ' + HI_PROCESS_DEFAULTS[key].eff.toFixed(2) + ')</option>';
    });
    html += '</select>';
    return html;
  }
  function hiStatusBadge(net_kj_per_mm, range) {
    if (!(net_kj_per_mm > 0)) return '<span class="hi-status-empty">—</span>';
    if (net_kj_per_mm < range.min) {
      return '<span class="hi-status-badge hi-status-low">LOW</span>';
    }
    if (net_kj_per_mm > range.max) {
      return '<span class="hi-status-badge hi-status-high">HIGH</span>';
    }
    return '<span class="hi-status-badge hi-status-ok">OK</span>';
  }

  function renderHiTable() {
    var tbody = document.getElementById('hi-tbody');
    if (!tbody) return;
    var unit = document.getElementById('hi-ts-unit').value;
    var range = hiGetRange();
    document.getElementById('hi-th-ts-unit').textContent = '(' + unit + ')';

    var html = '';
    hiPasses.forEach(function(p, idx) {
      var eff = hiGetEffForProcess(p.process);
      var ts_mm = hiTsToMmPerMin(p.ts, unit);
      var gross = hiCalcGross(p.v, p.a, ts_mm);
      var net = gross * eff;
      var grossStr = gross > 0 ? gross.toFixed(2) : '—';
      var netStr   = net   > 0 ? net.toFixed(2)   : '—';
      html += '<tr data-pass-idx="' + idx + '">';
      html += '<td>' + hiBuildProcessSelect(p.process) + '</td>';
      html += '<td><input type="text" class="hi-pass-name" value="' + (p.name || '') + '" placeholder="e.g. Fill" /></td>';
      html += '<td><input type="number" class="hi-pass-v" value="' + p.v + '" min="0" max="100" step="0.5" /></td>';
      html += '<td><input type="number" class="hi-pass-a" value="' + p.a + '" min="0" max="2000" step="5" /></td>';
      html += '<td><input type="number" class="hi-pass-ts" value="' + p.ts + '" min="0" max="10000" step="1" /></td>';
      html += '<td class="hi-cell-result">' + grossStr + '</td>';
      html += '<td class="hi-cell-result">' + netStr + '</td>';
      html += '<td class="hi-cell-status">' + hiStatusBadge(net, range) + '</td>';
      html += '<td><button class="remove-row" data-action="remove-pass" title="Remove">×</button></td>';
      html += '</tr>';
    });
    tbody.innerHTML = html;
    bindHiPassRowEvents();
  }

  function bindHiPassRowEvents() {
    var tbody = document.getElementById('hi-tbody');
    if (!tbody) return;
    var rows = tbody.querySelectorAll('tr');
    rows.forEach(function(row) {
      var idx = parseInt(row.getAttribute('data-pass-idx'), 10);
      var p = hiPasses[idx];
      if (!p) return;
      var procSel = row.querySelector('.hi-pass-process');
      var nameIn = row.querySelector('.hi-pass-name');
      var vIn    = row.querySelector('.hi-pass-v');
      var aIn    = row.querySelector('.hi-pass-a');
      var tsIn   = row.querySelector('.hi-pass-ts');
      var rmBtn  = row.querySelector('button[data-action="remove-pass"]');
      if (procSel) procSel.addEventListener('change', function() {
        p.process = procSel.value;
        updateHiResultsForRow(row, p);
      });
      if (nameIn) nameIn.addEventListener('input', function() { p.name = nameIn.value; });
      // For the numeric inputs, only re-render on change (keeps cursor stable while typing)
      [vIn, aIn, tsIn].forEach(function(el) {
        if (!el) return;
        el.addEventListener('input', function() {
          p.v  = parseFloat(vIn.value)  || 0;
          p.a  = parseFloat(aIn.value)  || 0;
          p.ts = parseFloat(tsIn.value) || 0;
          updateHiResultsForRow(row, p);
        });
      });
      if (rmBtn) rmBtn.addEventListener('click', function() {
        if (hiPasses.length <= 1) return;
        hiPasses.splice(idx, 1);
        renderHiTable();
      });
    });
  }

  function updateHiResultsForRow(row, p) {
    var unit = document.getElementById('hi-ts-unit').value;
    var eff = hiGetEffForProcess(p.process);
    var range = hiGetRange();
    var ts_mm = hiTsToMmPerMin(p.ts, unit);
    var gross = hiCalcGross(p.v, p.a, ts_mm);
    var net = gross * eff;
    var resultCells = row.querySelectorAll('.hi-cell-result');
    if (resultCells[0]) resultCells[0].textContent = gross > 0 ? gross.toFixed(2) : '—';
    if (resultCells[1]) resultCells[1].textContent = net   > 0 ? net.toFixed(2)   : '—';
    var statusCell = row.querySelector('.hi-cell-status');
    if (statusCell) statusCell.innerHTML = hiStatusBadge(net, range);
  }

  function refreshAllHiResults() {
    var tbody = document.getElementById('hi-tbody');
    if (!tbody) return;
    var rows = tbody.querySelectorAll('tr');
    rows.forEach(function(row) {
      var idx = parseInt(row.getAttribute('data-pass-idx'), 10);
      var p = hiPasses[idx];
      if (p) updateHiResultsForRow(row, p);
    });
    document.getElementById('hi-th-ts-unit').textContent = '(' + document.getElementById('hi-ts-unit').value + ')';
    updateHiReverse();
  }

  function updateHiReverse() {
    var target = parseFloat(document.getElementById('hi-rev-target').value);
    var v = parseFloat(document.getElementById('hi-rev-volt').value);
    var a = parseFloat(document.getElementById('hi-rev-curr').value);
    var unit = document.getElementById('hi-ts-unit').value;
    var procSel = document.getElementById('hi-rev-process');
    var eff = hiGetEffForProcess(procSel ? procSel.value : 'SMAW');
    var resultEl = document.getElementById('hi-rev-result');
    if (!(target > 0) || !(v > 0) || !(a > 0)) {
      resultEl.textContent = '—';
      return;
    }
    // target_net = (V*I*eff*60) / (TS*1000)  →  TS = (V*I*eff*60) / (target_net*1000)
    var ts_mm = (v * a * eff * 60) / (target * 1000);
    if (!isFinite(ts_mm) || ts_mm <= 0) {
      resultEl.textContent = '—';
      return;
    }
    var ts_user = hiTsFromMmPerMin(ts_mm, unit);
    resultEl.textContent = ts_user.toFixed(0) + ' ' + unit;
  }

  function initHeatInput() {
    if (hiInitialised) {
      // Tab might have re-opened — just re-render in case unit/range was changed elsewhere
      renderHiTable();
      updateHiReverse();
      return;
    }
    hiInitialised = true;
    renderHiTable();

    document.getElementById('hi-range').addEventListener('change', function() {
      var custom = document.getElementById('hi-custom-range');
      custom.style.display = (this.value === 'custom') ? 'grid' : 'none';
      refreshAllHiResults();
    });
    document.getElementById('hi-custom-min').addEventListener('input', refreshAllHiResults);
    document.getElementById('hi-custom-max').addEventListener('input', refreshAllHiResults);
    document.getElementById('hi-ts-unit').addEventListener('change', refreshAllHiResults);

    document.getElementById('hi-add-pass').addEventListener('click', function() {
      // Default new pass to last pass's process (most natural — adding fill after fill)
      var lastProc = (hiPasses.length > 0) ? hiPasses[hiPasses.length - 1].process : 'SMAW';
      hiPasses.push({ id: hiNextId++, process: lastProc, name: 'Pass ' + (hiPasses.length + 1), v: 22, a: 180, ts: 250 });
      renderHiTable();
    });

    var revProc = document.getElementById('hi-rev-process');
    if (revProc) revProc.addEventListener('change', updateHiReverse);
    ['hi-rev-target', 'hi-rev-volt', 'hi-rev-curr'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', updateHiReverse);
    });
    updateHiReverse();
  }

  // ===== Carbon Equivalent & Preheat module =====
  // Implements three CE formulae plus EN 1011-2 Method B preheat.
  //   CE_IIW = C + Mn/6 + (Cr+Mo+V)/5 + (Cu+Ni)/15
  //   Pcm    = C + Si/30 + (Mn+Cu+Cr)/20 + Ni/60 + Mo/15 + V/10 + 5B
  //   CET    = C + (Mn+Mo)/10 + (Cr+Cu)/20 + Ni/40
  // Preheat per EN 1011-2 Method B (T_p in °C), valid for CET 0.20–0.50,
  // thickness 10–90 mm, HD 1–20 ml/100g, HI 0.5–4.0 kJ/mm:
  //   T_p = 700·CET + 160·tanh(d/35) + 62·HD^0.35 + (53·CET − 32)·Q − 330
  // where d=thickness mm, HD=diff. H ml/100g, Q=heat input kJ/mm.
  // Reference: EN 1011-2:2001 Annex C, eq. C.4.
  // HAZ hardness uses a simplified Yurioka-style correlation: HV ≈ 802·CE + 90.
  // PWHT recommendation per ASME B31.3 Table 331.1.1 simplified.
  var CEPH_PRESETS = {
    'A106-B': { C: 0.30, Mn: 0.60, Si: 0.25, Cr: 0.05, Mo: 0.02, V: 0.005, Cu: 0.10, Ni: 0.10, B: 0,      label: 'A106 Gr.B' },
    'X42':    { C: 0.20, Mn: 1.10, Si: 0.30, Cr: 0.05, Mo: 0.02, V: 0.04,  Cu: 0.10, Ni: 0.10, B: 0,      label: 'API 5L X42' },
    'X52':    { C: 0.18, Mn: 1.20, Si: 0.30, Cr: 0.05, Mo: 0.02, V: 0.05,  Cu: 0.10, Ni: 0.10, B: 0,      label: 'API 5L X52' },
    'X60':    { C: 0.14, Mn: 1.30, Si: 0.30, Cr: 0.05, Mo: 0.05, V: 0.06,  Cu: 0.15, Ni: 0.15, B: 0,      label: 'API 5L X60' },
    'X65':    { C: 0.12, Mn: 1.40, Si: 0.30, Cr: 0.10, Mo: 0.10, V: 0.06,  Cu: 0.20, Ni: 0.20, B: 0,      label: 'API 5L X65' },
    'X70':    { C: 0.09, Mn: 1.55, Si: 0.30, Cr: 0.15, Mo: 0.20, V: 0.06,  Cu: 0.25, Ni: 0.25, B: 0.0005, label: 'API 5L X70' },
    'X80':    { C: 0.07, Mn: 1.75, Si: 0.30, Cr: 0.20, Mo: 0.30, V: 0.06,  Cu: 0.30, Ni: 0.30, B: 0.001,  label: 'API 5L X80' },
    'A333-6': { C: 0.20, Mn: 0.90, Si: 0.20, Cr: 0.05, Mo: 0.02, V: 0.005, Cu: 0.10, Ni: 0.30, B: 0,      label: 'A333 Gr.6' }
  };

  var cephInitialised = false;

  function cephReadComp() {
    return {
      C:  parseFloat(document.getElementById('ceph-C').value)  || 0,
      Mn: parseFloat(document.getElementById('ceph-Mn').value) || 0,
      Si: parseFloat(document.getElementById('ceph-Si').value) || 0,
      Cr: parseFloat(document.getElementById('ceph-Cr').value) || 0,
      Mo: parseFloat(document.getElementById('ceph-Mo').value) || 0,
      V:  parseFloat(document.getElementById('ceph-V').value)  || 0,
      Cu: parseFloat(document.getElementById('ceph-Cu').value) || 0,
      Ni: parseFloat(document.getElementById('ceph-Ni').value) || 0,
      B:  parseFloat(document.getElementById('ceph-B').value)  || 0
    };
  }
  function cephCE_IIW(c) {
    return c.C + c.Mn/6 + (c.Cr + c.Mo + c.V)/5 + (c.Cu + c.Ni)/15;
  }
  function cephPcm(c) {
    return c.C + c.Si/30 + (c.Mn + c.Cu + c.Cr)/20 + c.Ni/60 + c.Mo/15 + c.V/10 + 5*c.B;
  }
  function cephCET(c) {
    return c.C + (c.Mn + c.Mo)/10 + (c.Cr + c.Cu)/20 + c.Ni/40;
  }

  // EN 1011-2 Method B preheat (°C). Returns the recommended minimum preheat.
  function cephPreheat(cet, thickness_mm, hd_ml, hi_kjmm) {
    var d = Math.max(thickness_mm, 1);
    var hd = Math.max(hd_ml, 1);
    var Q = Math.max(hi_kjmm, 0.3);
    var Tp = 700*cet + 160*Math.tanh(d/35) + 62*Math.pow(hd, 0.35) + (53*cet - 32)*Q - 330;
    if (!isFinite(Tp)) return null;
    return Tp;
  }

  // HAZ hardness estimate (Vickers HV).
  // Improved over the raw Yurioka 802·CE + 90 worst-case formula (which always
  // assumed fast cooling and gave unrealistically high values for normal pipeline
  // welding). This version interpolates between full-martensite hardness (HV_M,
  // fast cooling, no preheat) and ferrite-pearlite hardness (HV_F, slow cooling)
  // using a simplified t8/5 cooling-time estimate that accounts for preheat,
  // heat input and wall thickness. Calibrated to match typical pipeline PQR
  // hardness measurements (X65 ~260 HV, X70 ~290 HV, A106 ~250 HV).
  function cephT85(preheat_c, hi_kjmm, thick_mm) {
    return (hi_kjmm * 4 + preheat_c * 0.15) * (12 / Math.max(thick_mm, 5));
  }
  function cephHardness(ce_iiw, preheat_c, hi_kjmm, thick_mm) {
    if (!(ce_iiw > 0)) return null;
    var HV_M = 802 * ce_iiw + 90;
    var HV_F = 100 + 250 * ce_iiw;
    var t = cephT85(preheat_c, hi_kjmm, thick_mm);
    var f_mart = 1.0 / (1.0 + Math.exp((t - 6) / 4));
    return HV_M * f_mart + HV_F * (1 - f_mart);
  }

  function cephBadge(text, level) {
    return '<span class="ceph-status-badge ceph-status-' + level + '">' + text + '</span>';
  }
  function cephCEBadge(ce) {
    if (ce < 0.40) return cephBadge('Easy weldability', 'good');
    if (ce < 0.45) return cephBadge('Caution — preheat advised', 'watch');
    if (ce < 0.50) return cephBadge('Restricted weldability', 'watch');
    return cephBadge('Difficult — preheat required', 'warn');
  }
  function cephPcmBadge(pcm) {
    if (pcm < 0.20) return cephBadge('OK for HSLA welding', 'good');
    if (pcm < 0.25) return cephBadge('Preheat helpful', 'watch');
    return cephBadge('Preheat required', 'warn');
  }
  function cephCETBadge(cet) {
    if (cet < 0.25) return cephBadge('Low risk', 'good');
    if (cet < 0.40) return cephBadge('Moderate', 'watch');
    return cephBadge('High risk', 'warn');
  }
  function cephPreheatBadge(temp_c) {
    if (temp_c == null) return '';
    if (temp_c <= 75)  return cephBadge('Light preheat', 'good');
    if (temp_c < 150)  return cephBadge('Standard preheat', 'watch');
    return cephBadge('High preheat', 'warn');
  }
  function cephHardnessBadge(hv) {
    if (hv == null) return '';
    if (hv < 248)  return cephBadge('NACE OK (sour)', 'good');
    if (hv < 350)  return cephBadge('Above sour limit', 'watch');
    return cephBadge('Hard — risk of cracking', 'warn');
  }

  function cephPwhtRecommendation(comp, thickness_mm) {
    var alloyContent = comp.Cr + comp.Mo;

    // Hold time: 1 hour per 25 mm wall (ASME B31.3), with practical minima
    function holdTimeText(min_minutes) {
      // hours per inch (25 mm)
      var hours = thickness_mm / 25;
      var minutes = Math.max(hours * 60, min_minutes);
      if (minutes < 60) return Math.round(minutes) + ' min';
      // round to nearest 15 minutes for display
      var rounded = Math.round(minutes / 15) * 15;
      var h = Math.floor(rounded / 60);
      var m = rounded - h * 60;
      if (m === 0) return h + ' h';
      return h + ' h ' + m + ' min';
    }

    if (alloyContent >= 0.5) {
      // Cr-Mo alloy (P-No. 4/5) — higher temperature, longer hold
      return {
        text: 'Required (Cr-Mo alloy)', level: 'warn',
        note: 'Cr+Mo ≥ 0.5% — PWHT typically mandatory regardless of thickness (ASME B31.3 Table 331.1.1).',
        showParams: true,
        temp: '705 ± 25 °C',
        time: holdTimeText(30)
      };
    }
    if (thickness_mm >= 19) {
      // Carbon steel (P-No. 1)
      return {
        text: 'Recommended', level: 'watch',
        note: 'Carbon steel wall ≥ 19 mm — PWHT typically recommended (ASME B31.3 Table 331.1.1).',
        showParams: true,
        temp: '595 ± 25 °C',
        time: holdTimeText(15)
      };
    }
    if (thickness_mm >= 13 && comp.C > 0.25) {
      return {
        text: 'Consider', level: 'watch',
        note: 'Higher-carbon (C > 0.25%) thicker section — review project spec for PWHT requirement.',
        showParams: true,
        temp: '595 ± 25 °C',
        time: holdTimeText(15)
      };
    }
    return {
      text: 'Not required', level: 'good',
      note: 'Carbon steel < 19 mm wall, no significant Cr-Mo content — PWHT not normally required.',
      showParams: false
    };
  }

  function cephCompute() {
    var comp = cephReadComp();
    var thickness = parseFloat(document.getElementById('ceph-thick').value) || 0;
    var hd = parseFloat(document.getElementById('ceph-h2').value) || 7;
    var hi = parseFloat(document.getElementById('ceph-hi').value) || 1.5;

    var ce = cephCE_IIW(comp);

    // Preheat is now a mandatory user input
    var manualEl = document.getElementById('ceph-pre-manual');
    var preheatForHardness = parseFloat(manualEl.value);
    if (!(preheatForHardness > 0)) preheatForHardness = 55;

    var hardness = cephHardness(ce, preheatForHardness, hi, thickness);
    var pwht = cephPwhtRecommendation(comp, thickness);

    document.getElementById('ceph-out-ceiiw').textContent = ce.toFixed(3);
    document.getElementById('ceph-badge-ceiiw').innerHTML = cephCEBadge(ce);

    if (hardness != null) {
      document.getElementById('ceph-out-hardness').textContent = Math.round(hardness) + ' HV';
    } else {
      document.getElementById('ceph-out-hardness').textContent = '—';
    }
    document.getElementById('ceph-badge-hardness').innerHTML = cephHardnessBadge(hardness);

    document.getElementById('ceph-out-pwht').textContent = pwht.text;
    document.getElementById('ceph-out-pwht').parentElement.querySelector('.ceph-result-note').textContent = pwht.note;

    // Show/hide PWHT parameter sub-box
    var paramsBox = document.getElementById('ceph-pwht-params');
    if (paramsBox) {
      if (pwht.showParams) {
        paramsBox.style.display = '';
        document.getElementById('ceph-pwht-temp').textContent = pwht.temp;
        document.getElementById('ceph-pwht-time').textContent = pwht.time;
      } else {
        paramsBox.style.display = 'none';
      }
    }

    cephRenderSensitivityChart(ce, hi, thickness, preheatForHardness, hardness);
  }

  // Render an inline SVG showing how HAZ hardness changes with preheat,
  // holding HI and thickness at their current values. Marks the user's
  // current operating point and (if HV > 250) the preheat needed to hit 250.
  function cephRenderSensitivityChart(ce, hi, thick, current_pre, current_hv) {
    var container = document.getElementById('ceph-sens-chart');
    var noteEl    = document.getElementById('ceph-sens-note');
    if (!container) return;

    // Build sample points
    var PRE_MIN = 25, PRE_MAX = 250;
    var samples = [];
    for (var p = PRE_MIN; p <= PRE_MAX; p += 5) {
      samples.push({ pre: p, hv: cephHardness(ce, p, hi, thick) });
    }
    var hvVals = samples.map(function(s) { return s.hv; });
    var hvMin = Math.min.apply(null, hvVals);
    var hvMax = Math.max.apply(null, hvVals);
    // Pad axis range
    var yLo = Math.max(120, Math.floor((hvMin - 20) / 25) * 25);
    var yHi = Math.ceil((Math.max(hvMax, 250) + 20) / 25) * 25;

    // Find preheat needed to hit 250 HV, if HV is currently above 250
    var targetPre = null;
    if (current_hv != null && current_hv > 250) {
      // Search forward from current preheat
      for (var pp = current_pre; pp <= 300; pp += 1) {
        if (cephHardness(ce, pp, hi, thick) <= 250) {
          targetPre = pp;
          break;
        }
      }
    }

    // SVG geometry
    var W = 700, H = 200;
    var ML = 44, MR = 110, MT = 14, MB = 30;     // larger right margin so labels never clip
    var plotW = W - ML - MR;
    var plotH = H - MT - MB;
    function xToPx(p) { return ML + ((p - PRE_MIN) / (PRE_MAX - PRE_MIN)) * plotW; }
    function yToPx(v) { return MT + plotH - ((v - yLo) / (yHi - yLo)) * plotH; }

    // Grid lines (every 50 HV on Y, every 25°C on X)
    var svg = '<svg class="ceph-sens-svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none">';
    // Y grid + tick labels
    for (var yv = yLo; yv <= yHi; yv += 50) {
      var yp = yToPx(yv);
      svg += '<line class="ceph-sens-grid-line" x1="' + ML + '" y1="' + yp + '" x2="' + (W - MR) + '" y2="' + yp + '" />';
      svg += '<text class="ceph-sens-tick-label" x="' + (ML - 6) + '" y="' + (yp + 3) + '" text-anchor="end">' + yv + '</text>';
    }
    // X grid + tick labels
    for (var xv = PRE_MIN; xv <= PRE_MAX; xv += 25) {
      var xp = xToPx(xv);
      svg += '<line class="ceph-sens-grid-line" x1="' + xp + '" y1="' + MT + '" x2="' + xp + '" y2="' + (MT + plotH) + '" />';
      svg += '<text class="ceph-sens-tick-label" x="' + xp + '" y="' + (MT + plotH + 14) + '" text-anchor="middle">' + xv + '</text>';
    }

    // Axes
    svg += '<line class="ceph-sens-axis" x1="' + ML + '" y1="' + MT + '" x2="' + ML + '" y2="' + (MT + plotH) + '" />';
    svg += '<line class="ceph-sens-axis" x1="' + ML + '" y1="' + (MT + plotH) + '" x2="' + (W - MR) + '" y2="' + (MT + plotH) + '" />';
    // Axis labels
    svg += '<text class="ceph-sens-axis-label" x="' + (ML + plotW/2) + '" y="' + (H - 4) + '" text-anchor="middle">Preheat (°C)</text>';
    svg += '<text class="ceph-sens-axis-label" x="' + 10 + '" y="' + (MT + plotH/2) + '" text-anchor="middle" transform="rotate(-90 10 ' + (MT + plotH/2) + ')">HV (Vickers)</text>';

    // 250 HV NACE limit line
    if (yLo < 250 && yHi > 250) {
      var ylim = yToPx(250);
      svg += '<line class="ceph-sens-limit-line" x1="' + ML + '" y1="' + ylim + '" x2="' + (W - MR) + '" y2="' + ylim + '" />';
      svg += '<text class="ceph-sens-limit-label" x="' + (W - MR + 6) + '" y="' + (ylim + 3) + '">250 HV (NACE)</text>';
    }

    // Curve
    var path = '';
    samples.forEach(function(s, i) {
      path += (i === 0 ? 'M' : 'L') + xToPx(s.pre).toFixed(1) + ',' + yToPx(s.hv).toFixed(1) + ' ';
    });
    svg += '<path class="ceph-sens-curve" d="' + path + '" />';

    // Current operating point
    if (current_hv != null && current_pre != null) {
      var cx = xToPx(current_pre);
      var cy = yToPx(current_hv);
      svg += '<circle class="ceph-sens-current-marker" cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="5" />';
      // Smart label placement so it never falls outside the plotting area
      var labelX = cx + 8;
      var anchor = 'start';
      if (cx > W - MR - 80) { labelX = cx - 8; anchor = 'end'; }
      svg += '<text class="ceph-sens-current-label" x="' + labelX.toFixed(1) + '" y="' + (cy - 8).toFixed(1) + '" text-anchor="' + anchor + '">Now: ' + current_pre + ' °C, ' + Math.round(current_hv) + ' HV</text>';
    }

    // Target point if applicable
    if (targetPre != null) {
      var tx = xToPx(targetPre);
      var ty = yToPx(250);
      svg += '<circle class="ceph-sens-target-marker" cx="' + tx.toFixed(1) + '" cy="' + ty.toFixed(1) + '" r="5" />';
      var labelX2 = tx + 8;
      var anchor2 = 'start';
      if (tx > W - MR - 100) { labelX2 = tx - 8; anchor2 = 'end'; }
      svg += '<text class="ceph-sens-target-label" x="' + labelX2.toFixed(1) + '" y="' + (ty - 8).toFixed(1) + '" text-anchor="' + anchor2 + '">Target: ' + targetPre + ' °C → 250 HV</text>';
    }

    svg += '</svg>';
    container.innerHTML = svg;

    // Note text — actionable advice
    if (current_hv == null) {
      noteEl.textContent = 'Preheat sensitivity (chart unavailable).';
    } else if (current_hv <= 250) {
      noteEl.textContent = 'Current operating point is within the NACE 250 HV sour-service limit. The curve shows the safety margin available — increasing preheat further yields diminishing returns.';
    } else if (targetPre != null) {
      noteEl.textContent = 'To bring HAZ hardness within the NACE 250 HV sour-service limit, raise preheat to ~' + targetPre + ' °C (current heat input ' + hi + ' kJ/mm and thickness ' + thick + ' mm). Alternatively, raising heat input also slows cooling and reduces hardness.';
    } else {
      noteEl.textContent = 'Preheat alone cannot bring HAZ hardness within 250 HV at this heat input and thickness. Consider also increasing heat input, qualifying with a higher acceptable hardness via PQR, or selecting a lower-CE material.';
    }
  }

  function cephApplyPreset(key) {
    var p = CEPH_PRESETS[key];
    if (!p) return;
    document.getElementById('ceph-C').value  = p.C;
    document.getElementById('ceph-Mn').value = p.Mn;
    document.getElementById('ceph-Si').value = p.Si;
    document.getElementById('ceph-Cr').value = p.Cr;
    document.getElementById('ceph-Mo').value = p.Mo;
    document.getElementById('ceph-V').value  = p.V;
    document.getElementById('ceph-Cu').value = p.Cu;
    document.getElementById('ceph-Ni').value = p.Ni;
    document.getElementById('ceph-B').value  = p.B;
    cephCompute();
  }

  function initCePh() {
    if (cephInitialised) {
      cephCompute();
      return;
    }
    cephInitialised = true;

    var inputIds = ['ceph-C','ceph-Mn','ceph-Si','ceph-Cr','ceph-Mo','ceph-V','ceph-Cu','ceph-Ni','ceph-B','ceph-thick','ceph-hi','ceph-pre-manual'];
    inputIds.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', cephCompute);
    });
    var hd = document.getElementById('ceph-h2');
    if (hd) hd.addEventListener('change', cephCompute);

    var presetBtns = document.querySelectorAll('.ceph-preset-btn');
    presetBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        presetBtns.forEach(function(b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        cephApplyPreset(btn.getAttribute('data-preset'));
      });
    });

    cephCompute();
  }

  // ===== Welder qualification tracker =====
  // Pipeline welder qualifications — Zakho / Peshkabir Gas Project (DNO/SALP).
  // Source: WQT certificates, all qualified to API 1104 + KU-TWK-PL-SPC-0208.
  // All certificates carry the same WPS scope (KU-TWK-42-QA-PRO-0200) but each
  // has its own certificate number, test date, and NDT report references.
  var PIPELINE_WELDERS = [
    { stamp: 'W-01', name: 'Firas Sibae',         cert: 'SALP-DNO-PQR-001', certDate: '2019-09-30', vt: 'REP-009-P01',  rt: 'SALP-03', ht: 'SALP-HT-01' },
    { stamp: 'W-02', name: 'Samir Jappole',        cert: 'SALP-DNO-WQT-001', certDate: '2019-09-30', vt: 'REP-009-P02',  rt: 'SALP-02', ht: 'SALP-HT-01' },
    { stamp: 'W-03', name: 'Ferhat Emir',          cert: 'SALP-DNO-WQT-002', certDate: '2019-09-30', vt: 'REP-009-P03',  rt: 'SALP-02', ht: 'SALP-HT-01' },
    { stamp: 'W-04', name: 'Idris Hedwan',         cert: 'SALP-DNO-WQT-003', certDate: '2019-09-30', vt: 'REP-009-P04',  rt: 'SALP-02', ht: 'SALP-HT-01' },
    { stamp: 'W-05', name: 'Zafer Sivri',          cert: 'SALP-DNO-PQR-002', certDate: '2019-09-30', vt: 'REP-009-P05',  rt: 'SALP-03', ht: 'SALP-HT-01' },
    { stamp: 'W-06', name: 'Ali Tizar',            cert: 'SALP-DNO-PQR-002', certDate: '2019-09-30', vt: 'REP-009-P05',  rt: 'SALP-03', ht: 'SALP-HT-01' },
    { stamp: 'W-07', name: 'Rifat Turkoglu',       cert: 'SALP-DNO-WQT-004', certDate: '2019-09-30', vt: 'REP-009-P06',  rt: 'SALP-02', ht: 'SALP-HT-01' },
    { stamp: 'W-08', name: 'Bilal Al Sibai',       cert: 'SALP-DNO-WQT-005', certDate: '2019-10-01', vt: 'REP-009-P06A', rt: 'SALP-04', ht: 'SALP-HT-02' },
    { stamp: 'W-09', name: 'Yasser Khawaga',       cert: 'SALP-DNO-WQT-006', certDate: '2019-10-01', vt: 'REP-009-P06A', rt: 'SALP-04', ht: 'SALP-HT-02' },
    { stamp: 'W-10', name: 'Amer Kawsh',           cert: 'SALP-DNO-WQT-007', certDate: '2019-10-01', vt: 'REP-009-P06A', rt: 'SALP-04', ht: 'SALP-HT-02' },
    { stamp: 'W-11', name: 'Hasan Pasa Sivri',     cert: 'SALP-DNO-WQT-008', certDate: '2019-10-12', vt: 'REP-009-P015', rt: 'SALP-05', ht: 'SALP-HT-03' },
    { stamp: 'W-12', name: 'Abdulbaki Ibrahim',    cert: 'SALP-DNO-WQT-009', certDate: '2019-10-12', vt: 'REP-009-P015', rt: 'SALP-05', ht: 'SALP-HT-03' },
    { stamp: 'W-13', name: 'Mowafaq Helwani',      cert: 'SALP-DNO-WQT-010', certDate: '2019-10-22', vt: 'REP-009-P022', rt: 'SALP-06', ht: 'SALP-HT-04' },
    { stamp: 'W-14', name: 'Rasool Tahla',         cert: 'SALP-DNO-WQT-011', certDate: '2019-10-22', vt: 'REP-009-P022', rt: 'SALP-06', ht: 'SALP-HT-04' },
    { stamp: 'W-15', name: 'Saad Aldeen Khawaja',  cert: 'SALP-DNO-WQT-012', certDate: '2019-10-22', vt: 'REP-009-P022', rt: 'SALP-06', ht: 'SALP-HT-04' }
  ];

  // Common qualification scope shared by all welders in this list
  var PIPELINE_WELDER_SCOPE = {
    project: 'Pipeline Construction for the Peshkabir Gas Project (C-21529 WP-2)',
    client: 'DNO',
    contractor: 'SALP',
    referenceDoc: 'API 1104 / KU-TWK-PL-SPC-0208',
    qualifiedWps: 'KU-TWK-42-QA-PRO-0200',
    process: 'SMAW',
    position: { tested: '6G', qualified: 'All Position' },
    progression: 'Uphill for Root & Downhill for Fill, Cap',
    jointType: { tested: 'Butt Weld', qualified: 'All' },
    material: { tested: 'API 5L X52', qualified: 'API 5L X42 to API 5L X65' },
    fillerMetal: 'E6010 & E8010-P1',
    fillerSpec: 'SFA 5.1 & SFA 5.5',
    fillerGroup: 'Group 1 & 2',
    odTested: '6" (168 mm)',
    odQualified: '60.3 mm \u2264 OD \u2264 323.9 mm',
    thicknessTested: '14.3 mm',
    thicknessQualified: '4.8 mm \u2264 t \u2264 19.1 mm',
    backing: 'Without (qualified With or Without)',
    electrical: 'DCEN for Root & DCEP for Fill, Cap',
    finalResult: 'QUALIFIED'
  };

  var welderInitialised = false;
  var welderSelectedStamp = null;

  function welderStatus(certDate) {
    if (!certDate) return { level: 'suspended', label: 'No record' };
    return { level: 'valid', label: 'Valid' };
  }
  function welderFmtDate(iso) {
    if (!iso) return '\u2014';
    var parts = iso.split('-');
    if (parts.length !== 3) return iso;
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  }

  function renderWelderQTable(filter) {
    var tbody = document.getElementById('welder-q-tbody');
    var countEl = document.getElementById('welder-count');
    if (!tbody) return;
    var q = (filter || '').trim().toLowerCase();
    var rows = PIPELINE_WELDERS.filter(function(w) {
      if (!q) return true;
      return w.name.toLowerCase().indexOf(q) !== -1
          || w.stamp.toLowerCase().indexOf(q) !== -1;
    });

    var scope = PIPELINE_WELDER_SCOPE;
    var html = '';
    rows.forEach(function(w) {
      var activeClass = (welderSelectedStamp === w.stamp) ? ' class="active"' : '';
      html += '<tr data-stamp="' + w.stamp + '"' + activeClass + '>';
      var photoSrc = WELDER_PHOTOS['pipeline:' + w.stamp] || '';
      var photoHtml = photoSrc
        ? '<img class="welder-photo" src="' + photoSrc + '" alt="' + w.name + '" />'
        : '<div class="welder-photo welder-photo-empty"></div>';
      html += '<td class="welder-stamp welder-stamp-cell">' + photoHtml + '<div class="welder-stamp-text">' + w.stamp + '</div></td>';
      html += '<td class="welder-name">' + w.name + '</td>';
      html += '<td><span class="welder-process-pill ' + pipingProcessPillClass(scope.process.toLowerCase()) + '">' + scope.process + '</span></td>';
      html += '<td>' + scope.position.qualified + '</td>';
      html += '<td>' + scope.odQualified + '</td>';
      html += '<td>' + scope.thicknessQualified + '</td>';
      html += '</tr>';
    });
    tbody.innerHTML = html;

    if (countEl) {
      countEl.textContent = rows.length === PIPELINE_WELDERS.length
        ? PIPELINE_WELDERS.length + ' welders'
        : rows.length + ' of ' + PIPELINE_WELDERS.length + ' welders';
    }

    var trs = tbody.querySelectorAll('tr');
    trs.forEach(function(tr) {
      tr.addEventListener('click', function() {
        var stamp = tr.getAttribute('data-stamp');
        if (welderSelectedStamp === stamp) {
          welderSelectedStamp = null;
          var __p1 = document.getElementById('welder-detail-panel'); if (__p1) __p1.innerHTML = '';
          var prev = tbody.querySelector('tr.active');
          if (prev) prev.classList.remove('active');
        } else {
          welderSelectedStamp = stamp;
          tbody.querySelectorAll('tr').forEach(function(r) { r.classList.remove('active'); });
          tr.classList.add('active');
          renderWelderQDetail(stamp);
        }
      });
    });
    // Auto-select the first welder on first render so the detail panel
    // never starts empty.
    if (!welderSelectedStamp && rows.length) {
      welderSelectedStamp = rows[0].stamp;
      var firstTr = tbody.querySelector('tr');
      if (firstTr) firstTr.classList.add('active');
      renderWelderQDetail(rows[0].stamp);
    }
  }

  function welderItem(label, value) {
    return '<div class="welder-detail-item">'
         +   '<span class="welder-detail-item-label">' + label + '</span>'
         +   '<span class="welder-detail-item-value">' + value + '</span>'
         + '</div>';
  }

  function renderWelderQDetail(stamp) {
    var panel = document.getElementById('welder-detail-panel');
    if (!panel) return;
    var w = PIPELINE_WELDERS.find(function(x) { return x.stamp === stamp; });
    if (!w) { panel.style.display = 'none'; return; }
    var s = PIPELINE_WELDER_SCOPE;

    var html = '';
    html += '<div class="welder-detail-header">';
    html += '  <div class="welder-detail-title">';
    html += '    <span class="welder-detail-name">' + w.name + '</span>';
    html += '    <span class="welder-detail-stamp">Stamp ' + w.stamp + '</span>';
    html += '  </div>';
    html += '  <button class="welder-detail-close" id="welder-detail-close" title="Close">\u00d7</button>';
    html += '</div>';

    html += '<div class="welder-detail-section-title">Certificate</div>';
    html += '<div class="welder-detail-grid">';
    html += welderItem('Certificate No.',     w.cert);
    html += welderItem('Final result',        s.finalResult);
    html += welderItem('Reference document',  s.referenceDoc);
    html += welderItem('Qualified WPS',       s.qualifiedWps);
    html += '</div>';

    html += '<div class="welder-detail-section-title">Qualification range</div>';
    html += '<div class="welder-detail-grid">';
    html += welderItem('Process',             s.process);
    html += welderItem('Position',            s.position.tested + ' \u2192 ' + s.position.qualified);
    html += welderItem('Joint type',          s.jointType.tested + ' \u2192 ' + s.jointType.qualified);
    html += welderItem('Progression',         s.progression);
    html += welderItem('Material',            s.material.tested + ' \u2192 ' + s.material.qualified);
    html += welderItem('Filler metal',        s.fillerMetal + ' (' + s.fillerSpec + ', ' + s.fillerGroup + ')');
    html += welderItem('Pipe OD',             s.odTested + ' \u2192 ' + s.odQualified);
    html += welderItem('Wall thickness',      s.thicknessTested + ' \u2192 ' + s.thicknessQualified);
    html += welderItem('Backing',             s.backing);
    html += welderItem('Electrical',          s.electrical);
    html += '</div>';

    html += '<div class="welder-detail-section-title">NDT &amp; test reports</div>';
    html += '<div class="welder-detail-grid">';
    html += welderItem('VT report',           w.vt + ' \u2014 ACC');
    html += welderItem('RT report',           w.rt + ' \u2014 ACC');
    html += welderItem('Hardness test',       w.ht + ' \u2014 ACC');
    html += welderItem('Tensile / Bend',      'N/A (not required)');
    html += '</div>';

    panel.innerHTML = html;
    panel.style.display = '';

    var closeBtn = document.getElementById('welder-detail-close');
    if (closeBtn) closeBtn.addEventListener('click', function() {
      welderSelectedStamp = null;
      panel.innerHTML = '';
      var tbody = document.getElementById('welder-q-tbody');
      var prev = tbody && tbody.querySelector('tr.active');
      if (prev) prev.classList.remove('active');
    });
  }

  function initWelders() {
    if (welderInitialised) {
      renderWelderQTable();
      renderInServiceTable();
      renderPipingWelderTable();
      return;
    }
    welderInitialised = true;
    renderWelderQTable();
    renderInServiceTable();
    renderPipingWelderTable();

    var search = document.getElementById('welder-search');
    if (search) {
      search.addEventListener('input', function() {
        renderWelderQTable(search.value);
      });
    }
    var isSearch = document.getElementById('welder-is-search');
    if (isSearch) {
      isSearch.addEventListener('input', function() {
        renderInServiceTable(isSearch.value);
      });
    }
    var ppSearch = document.getElementById('welder-pp-search');
    if (ppSearch) {
      ppSearch.addEventListener('input', function() {
        renderPipingWelderTable(ppSearch.value);
      });
    }
  }

  // ===== In-Service welder qualifications =====
  // Two distinct projects in the dataset:
  //  1) ER-589 Hot Tap Isolation & Valve Installation at CPS (Company CPDG, Client Dana Gas)
  //  2) Hot Tapping on 24" Commercial Gas Pipeline at Chemchemal (Company PPCL, Client Pearl Petroleum)
  // Both qualified to API 1104 Appendix-B + NACE MR0175 for in-service welding
  // (carrier pipe with sleeve Type-B). All welders share an "Unlimited" pipe/thickness
  // range and tested on 12" × 17.5 mm coupon. The key per-welder variable is the
  // qualified service category — Sour & Non-Sour, or Only Non-Sour.
  var INSERVICE_WELDERS = [
    {
      stamp: 'W-001', name: 'Abdulmuain Kawash', certDate: '2025-06-14',
      project: 'ER-589', service: 'sour-and-nonsour',
      cert: 'OPCO-CPDG-589-PQR-001', pqr: 'OPCO-PPL-252-QCD-GN-PQR-001, 002',
      vt: 'OPCO-CPD-251-QCD-PI-RPT-002', ut: 'MQS-OPCO-W.SH-UT-01', mt: 'MQS-OPCO-W.SH-MT-01, 02'
    },
    {
      stamp: 'W-002', name: 'Samir Fasih', certDate: '2025-06-14',
      project: 'ER-589', service: 'sour-and-nonsour',
      cert: 'OPCO-CPDG-589-PQR-001', pqr: 'OPCO-PPL-252-QCD-GN-PQR-001, 002',
      vt: 'OPCO-CPD-251-QCD-PI-RPT-002', ut: 'MQS-OPCO-W.SH-UT-01', mt: 'MQS-OPCO-W.SH-MT-01, 02'
    },
    {
      stamp: 'W-003', name: 'Ameer Fayad', certDate: '2025-12-07',
      project: 'PPCL-Chemchemal', service: 'nonsour-only',
      cert: 'OPCO-PPL-252-WQT-001', pqr: 'OPCO-PPL-252-QCD-GN-WPS-001, 002',
      vt: 'OPCO-CPD-251-QCD-PI-RPT-002', ut: 'IIC-OP-25-257-025, 026', mt: 'IIC-OP-25-257-019, 021, 023, 024, 027, 029'
    },
    {
      stamp: 'W-004', name: 'Asaad Ramadan', certDate: '2025-12-07',
      project: 'PPCL-Chemchemal', service: 'sour-and-nonsour',
      cert: 'OPCO-PPL-252-WQT-001', pqr: 'OPCO-PPL-252-QCD-GN-WPS-001, 002',
      vt: 'OPCO-CPD-251-QCD-PI-RPT-002', ut: 'IIC-OP-25-257-025, 026', mt: 'IIC-OP-25-257-019, 021, 023, 024, 027, 029'
    },
    {
      stamp: 'W-005', name: 'Akbar Ahmadi', certDate: '2025-12-07',
      project: 'PPCL-Chemchemal', service: 'sour-and-nonsour',
      cert: 'OPCO-PPL-252-WQT-001', pqr: 'OPCO-PPL-252-QCD-GN-WPS-001, 002',
      vt: 'OPCO-CPD-251-QCD-PI-RPT-002', ut: 'IIC-OP-25-257-025, 026', mt: 'IIC-OP-25-257-019, 021, 023, 024, 027, 029'
    },
    {
      stamp: 'W-006', name: 'Saadedin Khawaja', certDate: '2025-12-07',
      project: 'PPCL-Chemchemal', service: 'nonsour-only',
      cert: 'OPCO-PPL-252-WQT-001', pqr: 'OPCO-PPL-252-QCD-GN-WPS-001, 002',
      vt: 'OPCO-CPD-251-QCD-PI-RPT-002', ut: 'IIC-OP-25-257-025, 026', mt: 'IIC-OP-25-257-019, 021, 023, 024, 027, 029'
    }
  ];

  // Project metadata — shared by all welders within each project
  var INSERVICE_PROJECTS = {
    'ER-589': {
      title: 'ER-589 Hot Tap Isolation & Valve Installation at CPS',
      shortTitle: 'ER-589 (CPDG)',
      company: 'CPDG',
      client: 'Dana Gas / Crescent Petroleum',
      site: 'KRG'
    },
    'PPCL-Chemchemal': {
      title: 'Hot Tapping on 24" Commercial Gas Pipeline at Chemchemal',
      shortTitle: 'PPCL Chemchemal',
      company: 'PPCL',
      client: 'Pearl Petroleum',
      site: 'KRG'
    }
  };

  // Common qualification scope for in-service welding (carrier pipe + sleeve Type-B)
  var INSERVICE_SCOPE = {
    weldType: 'In-Service Welding (Carrier pipe with Sleeve Type-B)',
    referenceCode: 'API 1104 Appendix-B + NACE MR0175',
    process: 'SMAW',
    procedure: 'SMAW, E7018-1 H4',
    fillerBrand: 'Lincoln 7018-1 H4',
    filler: 'API Filler Metal Group 3 \u2192 API Group 3 through 8',
    fNo: '3 Through 8',
    odTested: '12" (323.9 mm)',
    odQualified: 'Unlimited',
    thicknessTested: '17.5 mm',
    thicknessQualified: 'Unlimited',
    diaSleeveQualified: 'Unlimited',
    longSeamPos: { tested: '2G',         qualified: '2G (Long Seam, BW)' },
    circSeamPos: { tested: '5F, Uphill', qualified: '5F (Circ Seam, FW)' },
    progression: 'Uphill',
    weldPosition: 'Fixed',
    electrical: 'DCEP',
    machine: 'Rectifier',
    clamp: 'External, removed after Root + Hot Pass',
    flowRate: '3.0 m/s max (per 361-037-PL-PRD-0003)',
    finalResult: 'PASS — All NDT and destructive tests'
  };

  var welderIsSelectedStamp = null;

  function welderServiceBadge(service) {
    if (service === 'sour-and-nonsour') {
      return '<span class="welder-service-badge welder-service-sour">Sour &amp; Non-Sour</span>';
    }
    return '<span class="welder-service-badge welder-service-nonsour">Non-Sour only</span>';
  }
  function welderServiceLabel(service) {
    return service === 'sour-and-nonsour' ? 'Sour & Non-Sour' : 'Only Non-Sour';
  }

  function renderInServiceTable(filter) {
    var tbody = document.getElementById('welder-is-q-tbody');
    var countEl = document.getElementById('welder-is-count');
    if (!tbody) return;
    var q = (filter || '').trim().toLowerCase();
    var rows = INSERVICE_WELDERS.filter(function(w) {
      if (!q) return true;
      return w.name.toLowerCase().indexOf(q) !== -1
          || w.stamp.toLowerCase().indexOf(q) !== -1;
    });

    var html = '';
    rows.forEach(function(w) {
      var activeClass = (welderIsSelectedStamp === w.stamp) ? ' class="active"' : '';
      html += '<tr data-stamp="' + w.stamp + '"' + activeClass + '>';
      var photoSrc = WELDER_PHOTOS['inservice:' + w.stamp] || '';
      var photoHtml = photoSrc
        ? '<img class="welder-photo" src="' + photoSrc + '" alt="' + w.name + '" />'
        : '<div class="welder-photo welder-photo-empty"></div>';
      html += '<td class="welder-stamp welder-stamp-cell">' + photoHtml + '<div class="welder-stamp-text">' + w.stamp + '</div></td>';
      html += '<td class="welder-name">' + w.name + '</td>';
      html += '<td><span class="welder-process-pill ' + pipingProcessPillClass(INSERVICE_SCOPE.process.toLowerCase()) + '">' + INSERVICE_SCOPE.process + '</span></td>';
      html += '<td>2G + 5F</td>';
      html += '<td>' + welderServiceBadge(w.service) + '</td>';
      html += '</tr>';
    });
    tbody.innerHTML = html;

    if (countEl) {
      countEl.textContent = rows.length === INSERVICE_WELDERS.length
        ? INSERVICE_WELDERS.length + ' welders'
        : rows.length + ' of ' + INSERVICE_WELDERS.length + ' welders';
    }

    var trs = tbody.querySelectorAll('tr');
    trs.forEach(function(tr) {
      tr.addEventListener('click', function() {
        var stamp = tr.getAttribute('data-stamp');
        if (welderIsSelectedStamp === stamp) {
          welderIsSelectedStamp = null;
          var __p2 = document.getElementById('welder-is-detail-panel'); if (__p2) __p2.innerHTML = '';
          var prev = tbody.querySelector('tr.active');
          if (prev) prev.classList.remove('active');
        } else {
          welderIsSelectedStamp = stamp;
          tbody.querySelectorAll('tr').forEach(function(r) { r.classList.remove('active'); });
          tr.classList.add('active');
          renderInServiceDetail(stamp);
        }
      });
    });
    // Auto-select first welder on first render.
    if (!welderIsSelectedStamp && rows.length) {
      welderIsSelectedStamp = rows[0].stamp;
      var firstTr = tbody.querySelector('tr');
      if (firstTr) firstTr.classList.add('active');
      renderInServiceDetail(rows[0].stamp);
    }
  }

  function renderInServiceDetail(stamp) {
    var panel = document.getElementById('welder-is-detail-panel');
    if (!panel) return;
    var w = INSERVICE_WELDERS.find(function(x) { return x.stamp === stamp; });
    if (!w) { panel.style.display = 'none'; return; }
    var s = INSERVICE_SCOPE;

    var html = '';
    html += '<div class="welder-detail-header">';
    html += '  <div class="welder-detail-title">';
    html += '    <span class="welder-detail-name">' + w.name + '</span>';
    html += '    <span class="welder-detail-stamp">Stamp ' + w.stamp + '</span>';
    html += '  </div>';
    html += '  <button class="welder-detail-close" id="welder-is-detail-close" title="Close">\u00d7</button>';
    html += '</div>';

    // Certificate
    html += '<div class="welder-detail-section-title">Certificate</div>';
    html += '<div class="welder-detail-grid">';
    html += welderItem('Test coupon No.',     w.cert);
    html += welderItem('PQR / WPS reference', w.pqr);
    html += welderItem('Final result',        s.finalResult);
    html += welderItem('Reference code',      s.referenceCode);
    html += '</div>';

    // Qualified service — most important field for in-service work
    html += '<div class="welder-detail-section-title">Qualified service</div>';
    html += '<div class="welder-detail-grid">';
    html += welderItem('Service category',    welderServiceLabel(w.service));
    html += welderItem('NACE MR0175',         w.service === 'sour-and-nonsour' ? 'Compliant (sour permitted)' : 'Non-sour service only');
    html += '</div>';

    // Qualification range
    html += '<div class="welder-detail-section-title">Qualification range</div>';
    html += '<div class="welder-detail-grid">';
    html += welderItem('Weld type',           s.weldType);
    html += welderItem('Process',             s.process);
    html += welderItem('Procedure',           s.procedure);
    html += welderItem('Filler brand',        s.fillerBrand);
    html += welderItem('Filler material',     s.filler);
    html += welderItem('API F-No.',           s.fNo);
    html += welderItem('Carrier pipe OD',     s.odTested + ' \u2192 ' + s.odQualified);
    html += welderItem('Wall thickness',      s.thicknessTested + ' \u2192 ' + s.thicknessQualified);
    html += welderItem('Sleeve diameter',     s.diaSleeveQualified);
    html += welderItem('Long seam position',  s.longSeamPos.tested + ' \u2192 ' + s.longSeamPos.qualified);
    html += welderItem('Circ seam position',  s.circSeamPos.tested + ' \u2192 ' + s.circSeamPos.qualified);
    html += welderItem('Progression',         s.progression);
    html += welderItem('Weld position',       s.weldPosition);
    html += welderItem('Electrical',          s.electrical);
    html += welderItem('Welding machine',     s.machine);
    html += welderItem('Line-up clamp',       s.clamp);
    html += welderItem('Flow rate',           s.flowRate);
    html += '</div>';

    // NDT & test reports
    html += '<div class="welder-detail-section-title">NDT &amp; test reports</div>';
    html += '<div class="welder-detail-grid">';
    html += welderItem('VT report',           w.vt + ' \u2014 PASS');
    html += welderItem('UT report',           w.ut + ' \u2014 PASS');
    html += welderItem('MT report',           w.mt + ' \u2014 PASS');
    html += welderItem('Tensile / Nick break', 'PASS (per API 1104)');
    html += welderItem('Side & Face Bend',     'PASS (per API 1104)');
    html += welderItem('Macro & Hardness',     'PASS (per API 1104 + NACE MR0175)');
    html += welderItem('Charpy Impact',        'PASS (per API 1104)');
    html += '</div>';

    panel.innerHTML = html;
    panel.style.display = '';

    var closeBtn = document.getElementById('welder-is-detail-close');
    if (closeBtn) closeBtn.addEventListener('click', function() {
      welderIsSelectedStamp = null;
      panel.innerHTML = '';
      var tbody = document.getElementById('welder-is-q-tbody');
      var prev = tbody && tbody.querySelector('tr.active');
      if (prev) prev.classList.remove('active');
    });
  }

  // ===== Piping welder qualifications (ASME Sec. IX) =====
  // Hydrotreater Unit + OSBL Project at United Refinery, prepared by OPCO.
  // Most welders carry 1–3 separate certificates that together cover their full
  // qualification range. The two common patterns are:
  //   (a) small-diameter GTAW (1/2"–2") + large-diameter GTAW+SMAW combo (6")
  //   (b) (a) plus an additional SMAW-only cert at 6" (E6010 root + E7018-1 fill)
  // A small group is qualified for fillet TACK welds only (W-019, W-020) and
  // cannot perform production butt welds — they carry a "Tack only" badge.
  var WELDER_PHOTOS = {
    "piping:W-001": "data:image/png;base64,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",
    "piping:W-002": "data:image/png;base64,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",
    "piping:W-003": "data:image/jpeg;base64,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",
    "piping:W-004": "data:image/jpeg;base64,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",
    "piping:W-005": "data:image/jpeg;base64,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",
    "piping:W-006": "data:image/jpeg;base64,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",
    "piping:W-006": "data:image/jpeg;base64,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",
    "piping:W-007": "data:image/jpeg;base64,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",
    "piping:W-008": "data:image/jpeg;base64,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",
    "piping:W-009": "data:image/jpeg;base64,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",
    "piping:W-009": "data:image/jpeg;base64,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",
    "piping:W-010": "data:image/jpeg;base64,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",
    "piping:W-011": "data:image/jpeg;base64,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",
    "piping:W-012": "data:image/jpeg;base64,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",
    "piping:W-013": "data:image/jpeg;base64,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",
    "piping:W-014": "data:image/jpeg;base64,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",
    "piping:W-016": "data:image/jpeg;base64,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",
    "piping:W-019": "data:image/jpeg;base64,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",
    "piping:W-020": "data:image/jpeg;base64,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",
    "piping:W-021": "data:image/jpeg;base64,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",
    "piping:W-015": "data:image/jpeg;base64,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",
    "piping:W-017": "data:image/jpeg;base64,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",
    "piping:W-018": "data:image/jpeg;base64,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",
    "pipeline:W-01": "data:image/jpeg;base64,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",
    "pipeline:W-02": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/wAALCADCAL0BAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/APsYqAKiklAPBFRliyg5wfenJgjBoJAYAdfWnAryetPBBXnODSgDOaUc08DFKBRkEUDBFL0pPrRSEc80tIBSYpAADwKcBjqaMYORS4qnLMSDjj3quW3HgU5WbHpSqxOfalViVBHT2pwbIzg8Gnn3OMetO3EcHB96NxBxnNSZIA5604EnGDilXJ64p30oJ5pGz0FLR3pcUmKKKMDOaXFFVhAOn50w25OfXtQLU4HzDPel+zZPOBThbhQFHSm+X26ilC45OaNuTjrQVI5AqC4uxb7fOG0MevYVKlxG6B0YMvrTHvraEAvPGobplqkguYZ1LQzI4HcHNTBsjng+1BbnGaAwA9RTg1KGyadRxRRRRUQkHcGngjPSgGilHWggU04AySMCuf1HxXpFlcS2802JI8ZAHXIzVdfE8c8crw+WgVcqZG61yN38RrdJJ9P1eJI2wQhQ5LZ6Guah8ZRzGXSzqZhV2KpIHwAK811rxGdOubm3fUzMyHbjzSfyqr4e+JWoaTebYdQmClhkCTA4Fd1F8Z52uFlhvZiuApRzxnuRXX6B8XrC4sZHvZ1jlQnHP3lxwR+tZviT4xSrEp0aYMQcEMg54/ya7PwB8TNO16yI1AJZ3Mf38uCpHr7fSu+hmiljSWJ1dHGQQeMVMGz3yPan4oANLRR+FR+Xz2pRHg07B7UYo5oI9Kxte083UL51Ga1U8HYcdsV83fFjTl8MpJc2Wti5uBIfkzlxnuef1rzX/hPNYNqYPPm3McYB49/pWdda5qM8qySyyvJgAZbOBjHFNe5nnfeDICMc9MH3qjLaXjMH/wCWuSSSf6U2O1uZCpZMsV57YqWNLlWZBGzx7OU7j6VJGt6Y/kRggwM55qe3e/i8yTDgocD0qex1y+s3ZZg0buAC47816V4O+J11Z6RFZy6g/wB4/Iz8Djj8K7ux+LSadpHF4t1OWJAZs4zz/Ou98CfEbTtdtVF3JHbznPU4U4rt7K7tr2BZ7WZJo26MjZFT0tFMyR05zSg+p5pc0tISAM1wXjv4o+HfC2+KR2urhCQ0cXRSOxNeHeNPjhqmtStbadAqQSR7dnU5PfPtXnl5b61rUpmubl8sdxyenamW3hMbs7zvLZwe/FacfhZ4kjwAwHKjvz2qzB4bfKll2ZPzBj1rVXwzbNtZgAOmRTT4UV5H2qq5OM9q0LPwdG0O8Y4GDmlbwV84xtIzxz0qO48HEKI0XILH5qzrz4fySkFjn0Jrmtd8I31op8sbQO2OtcxfJc2sn74SIyk9+K1/CHiV4rry5Xk8sA8Bq+r/AIReJNM/siC1hlaaaX5nC5IQdBXpwORmnUVFtY+mKcAc5zTx0pCeOK474s642h+Dbu7SYwzEBY8MASSen5Zr421a+1LW9UfzGLLI5JBOfxrY0nR4rVBu2lyAc7fX0rchhUyBU44wMnpWnaWwMp5Q4xjdzxWvYWkLSHevTgEdB7VoNbYyXTI4HShbYgOvlpu9QeAParVvFtGSN2eBitC0hDMV2rjHU1O8O5h8gHzYwe9P8hWG1I9vOT7UhtnYCMoCucnA5x6VTvtLtbiMKyDcM8ntXJeKPBttcwOViTdtA9814tq+iXOm37fuyqLkDj3rtvhf4pvPDmoW4iumSN8F8Hg89DX1/wCGtas9a06K6tXJDqCQR0PpWvRRRRRXi37VkyL4TsIg21zclicdF2Ef1r528Ooio0m8mTqua2knfeRwNo4OetXrRw21ywPY57Vu2Vyr7AwXCjGR3rasn8lTLKwGcbVUdPxrRhlWWJXMhOG5B6+1Fy0azeYCh3DueBTonjCbTwvXjrVyOYIhZs4zx7VbjuozjBXnoRU7zxksWZe2RTZLhVbcpOPrzUUk4YsQM4NQSMHXBKEdhmvOfiZYW0kTPEQHAyeO9eb2hH2pVz90YGR0r2bwJ498Q6NpH2axtraaJcY3nBFbUnxd8TRlvMsbZdpOR1H061PB8XvEzlimi2zrxjLkYr06LxZYt8vnopxxk8n8KZb+M9LmkMYvEUg459afc+MNKtlDPeRknOADnocUlt4y0yWIsLlSe3FeO/tOanZapolmYbgO8bneA3GMCvE9PeP7PGEAB6Eg9a2bUAcKjkkj5iOnrWrZoAxwqM2cGtqytZIsAKOcmtaCAsRlT8vB3H+VXre1c8FSTjg1dFk77QyKMDqT39KBAyoACMkHj09agEUnCs/yk8A96twxTElkYOcjrxVqSJkG4bcEcnOaqSGXzFUsCvU46UolMaGM45Hynv7VFdXIjhztRcLxjr/+uvPfGdxLLG5DrnPORivM4ork3Ru0AjjjY8h+ua7PQLeS4eFppH8skbgD+lbuqWNu1yBAJECY4LVa8t41B81YywyQa6trtvOMjyBnIwSR0x6UonWKNJj5YLnnK96V7y3k3tLFGB6AdanW60+G1aeURpnHAPArzL4wXlhdWS/Z9wI4bJxn3ridJl8mBQ4yq889/atUa1DbsN5GO4HUelWbTxBZ7tyOVTrk+tdDp/iKEINzptHQlq27PxGhODgqRndWrZ65FKAq4yxOFz2qydZXcFUcEjAPU0kurpEd0qtsYevOfrVi01i0NqrdSvUsatQ6naM25JEBzzyOalN7aOpCzovOTk9qjN/ZLK2yWMkDHPQGqd1LA+fLlVmC9c96xtSMsjbC7KuePX86434hu1tpDTKm5s4BNed6Zczyv5KL/Hu4PFbiatY2d5G3l3TSAZZQ2FyKuR+LrUM+61uCG6ZbIH0pNV8R6X5kbf6WNy56V7f/AMIfqJv3dyDEQNvzYOcVof8ACH3DkB3O0d88inT+BLhoy0N0Isn0+8Kii+GcssS/ar4sCcsqnqO1eIfFnQn0zxFcaermURgKgPbIB/rXJmF4bOKNs78YK471jaigGY/NBZ+cZ5zWZL9ojgEIlIcfMc9KmivtSj27pcrwMDtWjY6/cxSCIs7KDy2e9dHpniG7e8CiQhjxgnpXaaVetMVZmDhcZ55qTxBqkcQDEFAoHHauSuvFMqMctgKcLt71gXXjW6jlMgf7rdf/AK1RP491AsSpLRe7Yq1F4uvZGLCY7Rgque9b2ieJ75JIymXZmztJ7Y/xrqrXxNLfBUcEOT93HSk8fW3n+FpJJmXnDc+lea+H7Yi6TygcYxnrXa3Vho8GlsLmKQXBXJPbNcbJdWsTymNhgHOfarVvdwCJSdjKVG0sueK9wf446R5vy6bIQBkYkAx19vpTT8cLB2ULp0qA/Ngvzj64p0fxysWYgaZcMRkbQ/X0q2vxekuVPlaLdgDGGz1H5Vw3jK+/tnxEdVvLeSJXjwVPHIGOa4jV7bexYOAQPk44rHn0Vbp1nIZHQ9Rmqtxoas4BdlIOc+2Khh0qCOXe8jSdsHjpSSaarJsjXAfnp93mrWnWdx9qTarfIeeOtey+BdBjniW7lY5YDAIrc8S+GrN7Yho9zY6+teTeKfCskU3mxRYyewOBXI3GiwoSLhWX5uwqu3hwsW8ojaOQuOta+n+EZXjV1kAk7Y7Vo2nh/WLbZNGvnIhxjHrXYadpsnmRt5Hz7edldPeaML3SjbzNwVyc9uK4rQLL7JqPlNaBAGyhUcsM1p+PBALCOMwf6xvmA/u15/PpsIbLW7NGTuOD+lZ+oWQgKCI/K2Ths8c16fb+AtDhDmW+lbJ6+2OlTnw14Ut4DhjIQOpfmltjoVlJHFZWUTSpzuxnj3qS78UlkcKkcYHHAANYN5rAv1BmJ3A8Y6GqzETsxYBD2XHT/wDXWvZ2W8fJGGB9fWrR8PC4fc8CnOc49PSoR4YRpmYwYXsfQ1T1HTbazACxbiw7nHNVbS0ZpQVjIycH6V6n4JgdbZB8wxwAa29Ug3zBZTuAxisqXT4JJcSICOnPoaoXPhDTbzIWIAkEc/zrPTwHZI25UYNj6VLB4RjgYeUrgj1PWtm10NhAEeNlJXI44+n1pj6XHbzF0A3gdMY5prljEz+X86cMe1Yl1cWml51C5lQO3T2Nc/Hrceo3DpOkTqzdT2Bq9c6Bp95Efs7DrnC9PrXL6t4A1f7T/ojPcR46nsfSq82vXMzqtvHI5z93GQT61Xu766LMAkkaMMtlTyfSoYBdtM7BpUUgKCF5wa6bRtI0pmWW8e7cs4J2jg+tdjp+keF4wZF05yp+7uzx71x+qpZ2evS7Iy0StwueorV0q8hTJXCk962BrNsoByCQOcDvWFqviiOFZU3oOeCvaudS4fVJWk38KcY9fetrQY2e8jt3ZQefnY16j4cAhtw2MnoCOK05TvQ4X6kmsjV4JltWlE6qV6AVyNp4tltblornkbtobFdVpviOzuVGMHPA5rXTULN8bii84qfz4XRSkn1GfyrN1NhztAUZz1zmsK91Gz0i1Mt5IoSRsZHQ1xvii48J6/hn1WS2VDnbjINcddjTLGJpLS/WUA+n5Vo6TroiIEUzBlHJI611Vt4sLwqZHBPvXeQaRo1nOrQ2kKIfl3bBgfjUlxa2DyN51hDsGBuAHrVWey0qOQypEgLL8vA59qdpbW8dwqNErBgeNoG2tmJbabLEJG2MBSvWvLPixE1tqUM8EKRkrliP4uecVxM2qNDGzEMS3OQf0rHfV72SQKAyAknrSRCZwwkBfLDGKrXOoXVnKfIzGAfvDua1ND8XmEjzzkhsZ+ldfZfE2CI5DhdnVSavXnxUMi+VbRMzlcgqM1TtPFGqaiyvcO/lluQDirPiKS08lMqCzfMFyM1ywvLq1u1aCVjGBwuf0rbsPFc5cQzlkk4GCc1uT6tdCyaaJm2gDJzwRWlpV7NqEEQd8DpweprjPj9rUNnbWWmwsvmAeY43Dj0rifCPjyGzljh1PTrW8tTklmUZH/169h8Pr4T1zTxJbWFqqPhmBA744p2teFdEuLGSK2ENrcBvlKHivOdY0a9sLgRGQydRuB64r6RuILeBUE+1uwXsuao3FhZ3LKvm7QQABnoarX2jRpGUhmEpQ4UFulZYtooT50gkMqcAq3HFZfirxI9ikcpnS2QLgE4+Y1wniDx7pOt2kWmACa8ByHA4GPesaGKMYXYGzyBWVrUTJcCS1XA6bT1BNRwS3cIlRwMtgH604o1xZsjRhm3cMR19ayJ4pAzbrNsZIAA6VkHTbs3Ine2cIxIAweDXR6Pa3aTLiAtgbd2DxXZCw1MCJYrRgoGckEA1G9r4gku0le3AiRSAuO1Ur6z1qCaO4aFfJyQQBViysTq1yJ2h2LFgb84rrzaZiS0i3ujEA+5pdW13S/DFmRdOq3BBCJjkntXjXiyS713Uf7RuWDxsduM5KjtXLX8b2bmDb1Py47iuu+G/i630nUfstwXEbgDnrmvbdP1CG9tUkspVkZunHXNPmiEuGmty55wSK7e+LlZDdq3y8Bc9KzLhtOggE/nEMeTGzdfeuc17xr4d0yOUzTmXJ6Ix4NcB4k+JX2y1Fvo1g0bHkyu5zXBahdarqDkahcvMqnKpu4zWPc30GnsHSPZLjCketdl4b1Zb+xWSchJU4LbuM1oiF2Hmlshuh7j3FEiRxkFYvvDkk5pr3bQqjmIOFOOP51ag1aOJw0lmjtjJX1rQg1q2eU+ZpcQZccH6VrWXiC0iYKmnIoYj+HmumtNRmuo1RUQKRgcVMELEKSMr146j0pl7YQfZmDEN5gOO+KzbPT0ikaIMqJ1Cjufeti1SKBWeSIqVB8vHr614n8RZzqnikCTzCUYA4Oa1dGtbGezktnj2jHDkda5Hxxp0dmbd0iV2cYyTjj1rkbmGVk3LIAyDhscn8a6nwX4q1PR51ieU+UQBjd/KvU7PxKl3bJIZWbA61f17xjKZGeWUKxHIDda4bWPEGo34/wBE3rzgszVjLpyzTiW+leYk7jzxmnXUIVm2gADgYGBWHqNzLDKvlHLtxkc4rAa0vLm5KyYDOdwDf0rqNIsHtrcLHIxYnOPWum0m6aNx557YII4rYheN0cBVwDgLT0t7XeTI24lRgD1q7b6dZMFdgEJHU81ci0zTowSzbi+MkV0GkaLphVJHILZIHPSt2PT4ISvkupQnLZ9qun7P5TiIKCDwcdveue1S4j3KA4OR2PGap6eGa7y3T0o17WINPgLlxIwHygcnNeeaRost/qEuoXRMYmYsC3GOa2ZLMQadJg7sNsDDpzXJ+PIZZHWKRSCiAbhXHmzxJ5ZLEkE57Vm3tpJ5qkEII+c1t6VqF3bWwjjlbbgdDXZrpQMe+ZzJJ6seAKVrKKOAPu2rzwBVVVXAJVT7+lU52eZ/JhCkE5ptrpVv873IBfORWfqumCS5UwdR93J5q7orbQ0c64lUYIHBrZ+zx7iY+cnJB69KrRNJGrlFkV16jrkU4Xs8e0rgjg56HjtVw6tMLdgg2g45NPsvEBjlEUgygH45rQj8RTwODgqA3HPH1rdt/EN1LsVGAiA5I6VImo3jKYVuNoflj7Vdtre28oyOzM4GSCePrVTWfEVtp9syiQbgvCgVy+mvFq98l1qAk8syZCrwNvpXWPb+fC1pAyqkY3RZXk+grK1qO5trGCzkR4yX5Dfxe9c5q6JdTzlpAQeACeKwtQs1KqI0+YD07YrJa2jf5ZOZCcHPasu7gjgnZCcenNev3UOA3ODnAIqrdxLFEoHzEjnA5rA1U+UkkhJwp4NN8K3Fukq3EqDcBtKno1al3BHJJ+7IwwzyME/Ssl40WViOQjdO/wCFPv7OITqyNxJGDx/OrdlHJGi7QZEzVuC3fzimQmfWll0/DAgozE5IrRs9MtLoLHLCFcnrVu48FI/763kAwOfWs2/0s20iIcdME9qWzgjTKGbLHoB0rUtURQDIysH4yW6VJqF0yW5itzuG3DN6fjXOXdo81yqx/wCksecYzjPau1t/C8yW9jLbxSpdOOIMdTWxq1vf6ZJBb39j5CvtVZ4fuk+5rmPFayrrgWfG1E+Yhsg8da5y2hDwScDeCev6Gql1bKoDLICzckelYN7bbJPkAbc3Ix0rO1HTop5Fdpk3cgjHSvWbiBJY0aCX94oBZj0qpfRMkHL4LLjcR0NcJqtxJLMLaOIMgJzz96pra12RC5m+RV+bA712MtxDqmlQ3EI+eIBQqgVAuhTSo4SJvPdd+3gFR3NYN7FOipCeQhyPWrfhtLhruQuAVHysCcAelOv7K8hujKkz7Q34fhWzp7LLAPKlUyKBvDd6kS+8klZlx83UVv2mpb4lwwK9Dkdap6hAt0jSMv7oH5RnmsRbeO2VmaRumFBHWq7agZP3cVuGY8KD296ZK1wllJLqFwIEwQIxjmrfgLUI/LAgzJcLIeGHGK9Nsr+/eOKe7VYDkCKbIwAOAfpVfWPFdvcQiz1Vo5beBclk/jbtXnmsanNd3k32WP8AdTqAFxkjFMMEcVsG58z+ImsqZShXzHAByRWbcoACTlgeeucc1nyxAOThRnnk16rbQfZEDyDcpHTtWN4pvES2yGAbHyj0rhNPIN27vnJz9K6DT9M+2RSRRJIxYfKFGefpVGO11DSZy0cxjZGI2t0xW5p/iW6tLs3ksaTSBNoYHPH0qtruvWt3ASlr5MwHOwcHNS+G9S0iy8v7XbySBlzI6tzmtufxR4aYFf7PuCG4Xce+OtZGhajoceqzG4ndYHQgDbgg+9a5ufDN5pnlRXTb0YlVbvVO3ieKVPs9zmKTkANnFXUuoNkkM1wUc53ZHH4VgyLcX10IdPndhklmYcfhVu0ht9MdoZVaW4deHHRfWs7VlhuHkEzZycBQaoR28ttbF7JmhY5HPBFdJ4V1W5jsQdVaW8hU4T5sYqO9kdb+TkJySqnkAHtTBKLaZHdgzuMgg9sVBd3LtMSGIT7zg96oXt2iqGA+Yj/IrPu7t5doRR74GMUQ2V7el5Eh8tQcDI6131/O23ywzBc846Cud8QW5jtXlbOSMJWdp1sY1xhSp6kjqK17DVb7T0cW5ESOSofb1NUpM3TlriXeQc/Me9LBH8+VRNufTt61FNbREyF2Oc454zT4IovKbzkCRDnIpwlEuy0YJ5Kncsm3Hf1qM2y+cWaAFTgcDrVlLK2QDeoQL91B796uC1tY8Ekhyu75Wxj2pNL0yS+nJn3R24fKljVq5nhtJGht5Ukz2AwM1W02K7lF28igmNC2T2BqGziMgTbsOe+ORU+pQRE7pcYC9B0NQ6fZoYl2MFG7BXNNvItk+/LOo6KT3rOa6QXDMxZMjGcdD6Ul/czpiTeshIGD2FZd3NvTKyBuAxA4we9NtrSe9ljSB13swAUHiuhfRb4AATS8dlGAK6q5kjiVVdQVHJAHBrkdZu5r/UVSCMeRF1A6Z9aZAZSREyY2jJ9xViaUiDZ82Fydp6A1FburjJCruPB75qTakaM07PyPlwOCf8KdPM1w9tG+FhwdpI6UisJ5DbhsRkYJxwamS3gTKMcCprJyjEr/AAn5eKlvXRcSSYUsOcDrVK1kW91IWkKEAjMnPJxVlUuRdeXIu1M7ETPSoNdgGnleMSDDDvk1HZyXz3P2iJj8/wB4DoeMU+CR7dvLA2kHDZ6GrZaeVG+QhcZLAZH51WNwLWcrw27g8cCqM87eeWVR8p5APSqV0yuzSLtwO/rWVdvxhZCQecGsu8vGWMiMhOMk45+legfDv7HdRQSAoJPf19a7UxQrI6yBsg9V6Gs7qJM8/uzXG2PGqy4q9ddz3xRHzbz/AFFZyc3H/Aquf8uyjtn/ABqxe/8AIJt/qaXTgNi8DtWhcqu5flHQ9qgg/wBYv4VBrPVvpVHw4SPGdtgkZFdDff8AIQH+9/Wq3jLrB9BTNI/4+Lb6/wBaj1f/AJC91/12H8qsj/jyUf7VVtRA8scdj/OsaHpcHviqNx/q2+tUGA39O1ZF0AXfgfdH8q3PAbN9ti5P5+9epy/61vrX/9k=",
    "pipeline:W-03": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/wAALCADGAIgBAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/APsuiiijNGaQn0qKSVUUkkcdawNT8TWdtL5fmN8pOSgzyO1VYvGdhKM5dR9MmrGk+KYdQ1EWkClx3b0+tdGkgYdc0/PYUZpM+9JuOcE0Ekng0+iiijFRvIin5mUfWsjX/EWmaRDm4uF3sdoVeecZ59K8d8W/EG7SWVLa42RO7Y2nJxXP6V4k320jyXIM5PyBu4o1XxRfR2yJEAEJ+8Fwfw9qpaD46u9OvjOpO8NkAjg16x4C8eSavMsdw0almAJY446cCvTUZWXORinAA8gYpccU3B/+tSj06U+iikbgZrF1PW1t2eKGLfIoydzbRivEfGnirWLnWJ1gu5HiJwF3YXHoK5m+nuvLeWc3EryHIO7gVyWrfaZLgOI32gcY9azbm5ube6VASuOWYHPFWINSu3lUTTNnBx/+qi6eR43mZSSpPXvS2Gs3FvIkqSCIZBBXsRX0D8GPG1pd6cLa/wBRSS7LEBMkk+n1r12N8oCOhGaf/DxyaOQOaOnU/hUlFFcj458ZWXh9DCGElxgFlH8I964aLxdqni4NBYaM0xVcfumzx7mt3wz8O4pLdZ9dRhMWz5SsOMeprppfBfh94ypsQRtwPmPFeOePNDWwurhI4AoDHblc4HavNb3SN9x5kgkOfvBRVa20gxjLRsP9qtFNILQjzEAUgfL/AHqq6n4e85j5ZMYyML0yKxfOn0e7aWJpIlD8Enqe3SvXvhh8XZra5hsdamL2pGyPA5H496980bVLXVLRbi0fcpANaGKDjP1p9FZPijWLfRdHmvJ2xgEKM8sfavCNcmuvF1/FaW5FxqEzlV3ZGB6mvb/BegWnhzRYrG2RQ4AMzjPzvjk89q3qrXlxHDESW56CvNPHk8c6bH2Eg9QOTn1rz2/tlyN3A7j0qs9rFu2hMDuOuKZNFlV2KQmcAnpioXt8uvygZ5CkVna1pVvewMihEPfjvXEXlpNpt6qMishIKHvX0P8As5+I472xl0eaVvPhG9VdtxYd8Htjjj3r2ftS0tFeEftA61drrcdgnmfZ44xgZwGY9a0PgfpAjibWrnLSSfKgI4UeufWvWDdhSoJA+hqne61HB5gLoAOmTzXJ6v4sgRWVSX2npXF6rq817LnaoGTnNY0spckuSAc5wucVXZnypBJyecjpiozjIJzt6YPeibaSPmIyApI7ZppRUn2o6sV45H3s1ieJ9MhvNNfETCROVYHpjt9K0f2dZWi8e21u7uC6nIHGcDp+lfVXFLxS0V4Z+0Zp0sus6XNyscqFVx3YEZ+nUV3vhi3Ww0KziDqipEoI98VHrGprDBI4fp/nmvOdV1p7m4kjWWRVXJYA8fnWNNJJJGrGVgAc9aY0vz/IcjGQDTJncpk53DqB6VH52CvJAPGM85pGlbqUDKvK59KhaRWBZBg45z61IE8sCT+Jh36CnXZEibGbGRyPWl+Ddraw/Ey0+0bVG8suWx82CFH519RAUYpaK8z+OFubhNGC4O2dicnp07e/9K1baRlsER1bdtHUe1c94sMywkBgNwxxXC38DxEAkfN02nO7vzVfeCFRvmK91xn8fWq00480MowfXrTHmcoBGQW6n6VD5+w7lA3YIpizl1BBx2x6U4dGYnCgZx6miOXKklimOoNTE70wWAz3PepfBUXkfEXRmy53XKhQvfmvqEUtFFcL8XbOSfTbGZQNkVyA/vngCkgDC1UFmZ8DBPXFc54nbZAzSZbjgZ+Uelee3lywc72z/MVmvcuG4O0HJHPJprOMAb/vck9AKduMao6FSHH3gc8VWlaTDneq8ce4FVDdRJGZA4BTqc4BqOTVLaLP79SuCQVOKks9ShulYxzAsB0ZsE1sWckbSxuHA4AbjIArW8PzLb+M9FuH+RRdKd4bgAnH8u1fS46UtFFcx8SVjPhaVpW2hZEYH0O4VkKypFGZW+XYCW6Z4rzL4l+N7G0Vra3jLMhIOOR7GvJ9V8UajeFpYoJFVeQAMGsmDXtQJZJBllGWLZGK0tP1i6zvuXDAgYwa247wi3VYzgnrnoKx9Wv5g4Cksq56Hg1zWoXV/MzIj7FPUelJBpczgIbksV+8pPQ1r2ml3CKrQu4QDnnrXXeHTObfbISWxjJH6VpXdxNaz2U0HJSQN049q+jvh3rr+IPDsV7KoEiny3I/iIA5rpaKK474h6n5ECaf5aOLpSMMM4wfSuR8XTvZaUjRt83lhR+VeE6w9u08lzcybwSSR1JNc1qOsFYtlrCyZ6tjP0rEmmvZHLsu4Z6gdqv6YkpkTjJBGQTzmvQLS1XyBI0ZU7RjmsPxOjLiNIwnPLGuTuomeQltzPt4PQN9Kjt7e8kkO5pE57d66LRJNQjZUbcUzg57iuu0wARs5cg5yuDWnesJtqMxALjnHWvcPgfGIvCcqKwZRdNg/gK7/NVROdx+YUonye1cJ8SIi+oWlyxCRKhBdjgDrXM+Kb6NtOjEaiQADHPUV5RqmkvdB5DB5cbHgL0rEvdDliRT5YeNh8vGM1UOk3WHUKdpG04HSrWkaQ4u0Z1AII7cV2VwqpEqfLnbjBHQVh6vbfa5WIQAHAJx2rFm0SZyGyuB8q8dqsQaVIPLZWBKjk1p29hIjBgDtXvjqasxwzoMsjCPqOOfalv7gm1RGIUk4471798E0eLwerSJ5avKSuR1GBzXe7hXnsWtzgkscr2wfyq7Br42qgYlvUDisnxxeLqehyqh+ZRke5ridCvLe70oi5TLw5DA8VS1ya2DHYirg/dB61gzSCRNwjGFPA9KaIY1Vmd1+bsD3p2m+WbwjaGiXgjuT+FPvHZ3KAEkE4A9O1ZruQdzkEZ59ackokmVC49MdOanVkWIqygAtuyP5UzzQVwN3JzyMUyZwFLZbIPUnise/lFxqENmHJAOTX0Z8MJHs/CVrAw2ck+pOTXXJffwtyR+VeLrqymMLISYw2AQccjvVyC9eUK0YGw8bQ3StPThNdfu3t5WjxkkL2rhNVuP7L8Q3dnArRxS5Zd5FZMkryszzdQOAvQimrKrEKysoByRjgVU1a/jRSEG1gORmpNC1WGG2JmUCR+DuPP4VNLNE7/KxOWOCDVS7ktUKrLIiHP3mOKoXUojlEsMgcA/5NaNrOJ1G11GR0p77m3+YACBgfSoL6d0t2LNwCOnesfwjF/afjEKsishPII5FfRGm3XkxRwwuWZRgf3eKtvduyrIS4YjGB29688Fxpkkxi2xs3TCnv6/rUVxrmkaYybpSApPyKM9qy9d+NtzbRmLTNOiiwNvTceK5fVNX1HXli1i/QRu/JIG0Ed6tm6gcoqPtBXgVHd3Tx2rFiD/AIVxPiDXFS62mRFZugznj6Vk3/iOYWuzfhgQBgUaX4uuVQQsCSGILE8mm6n4nkc7tgbaxyTzSWXiyRiY3ZNoQleO9aui+JjLcrHlVPf3rt4L5JEUOVy69c1h+INRjWORY24xjAPQmqHw+u2trq480vFnnzUOCDXdaF4w8Q2M629x/pdqc7XCckZ45rrrPxWuoOiwybXztZG4INYerXkCh47VI4IAuDJ3Y+ua4jUbe+1e6NtZ5lUnYSvJ+tez/C/4K6G2lQ6p4iWa5uJBkQb8IvPU4GST9az/ANoex07TFsINMtUiSCHyxEi4AGcjHHvXi8uoNDIsagh8ZPt9aZfaz/oRXdhn6nH3a4uaD7TcqxJLSc7j25rSTw7aBBvlb5+WOeamPhm3kUeVLsI4IP8AOkg8KwxlpJp96YJZRwKjm0C1OBbShWQEgMKxRayWU+5nJYH5iP0FdbDqyrZpF2XGWY1nXt6Jp3RXKgjK/U960/Akq/2iI5QsqkkHFesRWMYiQwymPK/dzkA+3tQmm+bIYZUUHOQy8En3rm/F+iawNct9LuDLaRNGpIIIIyO/vXtfws+HenWOnxMTJvBBdmHLe2a9Ytoo4IVhiTaijAFcV8ZNKsb3wfeSTKFkRdyvjJGOa+MNQumQyKuMDIznk1RaR7g7GG0ADJPQVc0u1S7wzEYUYGOCa6OOzsljPmZIz8oNOnl0yEl3dUwuRlqSOXTGKjz0dT1AagW2msN0bJg9geTXN+IbCCJGkViXz8oBrnhO6hWJCgnoTnIqOW9xP5iKD6c1s+BLqc6q7KroNvXbwMdq9u0OZrqONSo81V6nircj3kN3vZAOM8H3r1XSfEXhrXbuNtRsbKa8wNkjoCSOtdDputT6lq3lWMSRWFuT5jHq57Aenet62uorh5ERgxj4bHrXif7Sviy5sYYtLtbgRBuZf9oen0r5WuLv7RNKpdd5BJwOvNRNIxUnHGOfrU9vqf2MjfOu9hkqO1aH9pS3lu0qMd3TGcc1lPaXl1L5S7mY8HJqRLK7tneMh2VDnIHSpbbU3t2ZBzkHrVS+1YzRu8rgH+EVk3bRsQ4ZRlOMHBFVftET2wVcBhz05rs/hfILe/zOHJcZwD0HrXteiW0TKJIc5Jy2TzzXQXdks0RdRucLjArFDSq0d9psJHkDdJjPI+teveGruW60i3mtYSDcRhmB4wa0tImFg11aRSZlz5krseSfavk39oLxDPqvi2ViCF+4q9NoHSvKdnmXYYs8YAySD0p4lLxsC+5v7q4/OnC0Mk6LITu28Fe9WoEWGbb5pJGBjd/OugsLtbeHcyKAOBTZ9QW5YxiUDBztHTJ965nUkeVmEbFCWPQ1mXNr5HH2ncuc471UmhgbG2RixwBntVt7JUhDkuCBgArjNdv8J4IF1ETXL43EYJ5Fe6WVrbqwlhkIB4+U/rW5FdGFfnRWUdd3f2qG4i1DRfBkNlLahb29JB4ztHYfjXovg2WXRfhxDJqEYikRSF3Ak4PT3rgLPxBOPt8xkP70FVLHgCvBviHH/aF43lrvKOcN05rgzAPMaWNgUU5b696luba3MYeFW3k5IzVa1lEUpQsd444602e6s3kYW7uo256fxU6LUovJG9+QOOeaW21HTuR55wT90jrTbvULONESPe6BskgdKo30hlVbdIztxkNjn8ataVYxAZlYmVOXB/xp9ygLeZIGPP3M84rS0K7eAZgfaA24e1eo+D/FcCRCG4zuPCnOQT2rtrTWo7pdu4Fj175FepwaI3iTxa09/E32C2AZARtBOeB71k/FvxfGrtpFjGyiMfO5OPwArywzXDwyAHcp4J6j61yTwJcXU0ckZYsf4ulcNqdlJa6nJbbQEOWUHoBVaSYQQq4CtGSQxPXNRfY7SZw6SKrlM/KemarnSXeKUwyKm7hs+3Sqy6WEGAckjOCKiudGjaVirICTnjoKhNkY4yxkyEbB4rS0+0cw7mb5ASemamDGV2CbduOBjBNZt188xR5gAOpHerllmOIZmAAOAB1P1ra065IUBW/iGN1b9pqEtrJlJyHJGCG4HtX2j4auf7R0y4mKtHGDhSOuPXNeJfEC2ig1KRUkMkrNnB5wPrWHPPbpprquNynOO/SsXR7fz9TeRwUTBIB7msf4laZC6Q3BjLSJy23jj0rh0aOUfvbZRCeoPXNZjaRJukntJcfNwv8ASnpNfQRhJ7YluckCrDusiBUjYS98dMVL/Y95OvmsDHEflDN1JFFzo0NtCTMzTSHHAPWo7kTwRSpEiINucFuh9q5/Uby6s5FmVImIH8Q4/Ks6OS6uH84L8pPzbelbscLyINrBC3GBWnaQtGqk8g88DPPtWnGEEaMFYknHWvuXVb218K+FYoJpQZtojyi/ebHJx2rwDxPPPe37XLSMxJJIxyM1RSxLArkoT0VuSfekuLRNOt2lDZPXHoK878X6uL7MIldsjkiuMkhn+2gfaWFvs3kZHT/GrdjqNvp0u6eNpARx71PbX8cqPMxKjd8oPOadLfRIqokLBQ2WZewNQ3l/Lt8qW5ZV4OxT2rNvbxrc7hLJKGPQnOBVyRXhhje7xvZRIoBzwema57X5Y5jIBEzFiCST0pLCNRbbWPl7RkEHqa3LOOKS3XYHZ1bcxPQj0FaFvskLlQQwU4GatxtFt3O5DdRjtX0j421+71fUjbMzyQh9wx05PSqdkloYWjMJEmCDvOc/Ssy/jWORpEGAoBLHnH+cVz3ifUoBpUsrTnHGMcZOK8qnYE5IJc+nAGazLxY3hmVSN45GBmoLaMXUOZiDt+UHHJpJYHHyoeCcAD1qJYJN7xs5G7k805LUJfAF5HTAJZhyRRfxBJQnkkfNkZHX0qheX/lny0JLnhgRnFV3snuJXbL+SoBBz1rXt7Z1j/gKdwa1IoiQkMDcN2A+6acMKdpbIPfpmrLOQ2fKQArge9fRlu0coICYI4JPcjvXP30k0GorIshC8jaKtRKl+jI4IiCEsM8kDtXkXjPVDPq88EMflwQjYqE9q5u5cRRrwSSvP1qpGYp1MYQqVOQc1HJIba5WA/Om3djFWNInTVb5YFiEJHygj1Hem6oRZXTYyeNpx3FZF3fbj8qEenPSql3qd3GymOQ89dxp1kqSXXmSDcwGM1tW80TKsflkEjaCO1W1/wBaigkHuakWF2VJNwGZMHHXFSvEGkLLwq5AB5qdIl5OSGfAGOgr/9k=",
    "pipeline:W-04": "data:image/jpeg;base64,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",
    "pipeline:W-05": "data:image/jpeg;base64,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",
    "pipeline:W-06": "data:image/jpeg;base64,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",
    "pipeline:W-07": "data:image/jpeg;base64,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",
    "pipeline:W-08": "data:image/jpeg;base64,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",
    "pipeline:W-09": "data:image/jpeg;base64,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",
    "pipeline:W-10": "data:image/jpeg;base64,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",
    "pipeline:W-11": "data:image/jpeg;base64,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",
    "pipeline:W-12": "data:image/jpeg;base64,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",
    "pipeline:W-13": "data:image/jpeg;base64,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",
    "pipeline:W-14": "data:image/jpeg;base64,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",
    "pipeline:W-15": "data:image/jpeg;base64,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",
    "inservice:W-001": "data:image/jpeg;base64,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",
    "inservice:W-002": "data:image/jpeg;base64,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",
    "inservice:W-003": "data:image/jpeg;base64,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",
    "inservice:W-004": "data:image/jpeg;base64,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",
    "inservice:W-006": "data:image/jpeg;base64,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",
    "inservice:W-005": "data:image/jpeg;base64,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",
  };

  var PIPING_WELDERS = [
    { stamp: 'W-001', name: 'Abdulmuain Kawash', qualifications: [
      { type: 'gtaw-smaw', cert: 'OPCO-UTD-WQT-001', certDate: '2025-06-21', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '1-)2mm, 2-)5.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '1-)4mm max, 2-)10.22mm max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)ER70S-6, 2-)E7018-1', fillerSpec: 'SFA 5.18 & SFA 5.1', fillerFno: '1-)F No. 6, 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-001', rt: 'MQS-OPCO-RT-03' },
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-003', certDate: '2025-06-21', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '1/2" (21.3mm)', thkTested: '3.73mm', odQualified: 'OD \u2265 1/2"', thkQualified: '7.46mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-001', rt: 'MQS-OPCO-RT-04' },
      { type: 'gtaw-ss', cert: 'OPCO-UTD-WQT-SS-001', wps: 'OPCO-UTD-251-QCD-GN-WPS-005',
        odTested: '1/2" (21.3mm)', thkTested: '3.73mm', odQualified: 'OD \u2265 1/2"', thkQualified: '7.46mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER347', fillerSpec: 'SFA 5.9', fillerFno: 'F No. 6',
        material: 'A312 TP304 / TP316', materialQualified: 'P No. 8 (Stainless Steel)',
        vt: 'WQT-VT-001', rt: 'MQS-OPCO-RT-04' }
    ] },
    { stamp: 'W-002', name: 'Samer Fasih', qualifications: [
      { type: 'gtaw-smaw', cert: 'OPCO-UTD-WQT-002', certDate: '2025-06-21', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '1-)2mm, 2-)5.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '1-)4mm max, 2-)10.22mm max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)ER70S-6, 2-)E7018-1', fillerSpec: 'SFA 5.18 & SFA 5.1', fillerFno: '1-)F No. 6, 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-001', rt: 'MQS-OPCO-RT-03' },
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-004', certDate: '2025-06-21', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '1/2" (21.3mm)', thkTested: '3.73mm', odQualified: 'OD \u2265 1/2"', thkQualified: '7.46mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-001', rt: 'MQS-OPCO-RT-04' },
      { type: 'gtaw-ss', cert: 'OPCO-UTD-WQT-SS-002', wps: 'OPCO-UTD-251-QCD-GN-WPS-005',
        odTested: '1/2" (21.3mm)', thkTested: '3.73mm', odQualified: 'OD \u2265 1/2"', thkQualified: '7.46mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER347', fillerSpec: 'SFA 5.9', fillerFno: 'F No. 6',
        material: 'A312 TP304 / TP316', materialQualified: 'P No. 8 (Stainless Steel)',
        vt: 'WQT-VT-001', rt: 'MQS-OPCO-RT-04' }
    ] },
    { stamp: 'W-003', name: 'Asaad Ramadhan', qualifications: [
      { type: 'smaw', cert: 'OPCO-UTD-WQT-008', certDate: '2025-08-27', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '5.11mm', odQualified: 'OD \u2265 73mm', thkQualified: '10.22mm max',
        backingTested: 'With', backingQualified: 'With',
        electrical: 'DCEP', filler: 'E7018-1', fillerSpec: 'SFA 5.1', fillerFno: 'F No. 1, 2, 3, 4',
        vt: 'WQT-VT-003', rt: 'CEC-2025/IND/AUG/OPCO-012' },
      { type: 'smaw', cert: 'OPCO-UTD-WQT-252-019', certDate: '2026-03-03', wps: 'OPCO-UTD-252-QCD-00-WPS-001',
        odTested: '6" (168mm)', thkTested: '7.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '14.22 max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)E6010, 2-)E7018-1', fillerSpec: 'SFA 5.1', fillerFno: '1-)F No. 1,2, 3 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-022', rt: '2026-HB-RT-UR-01' }
    ] },
    { stamp: 'W-004', name: 'Saadadin Khawaja', qualifications: [
      { type: 'smaw', cert: 'OPCO-UTD-WQT-009', certDate: '2025-08-27', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '5.11mm', odQualified: 'OD \u2265 73mm', thkQualified: '10.22mm max',
        backingTested: 'With', backingQualified: 'With',
        electrical: 'DCEP', filler: 'E7018-1', fillerSpec: 'SFA 5.1', fillerFno: 'F No. 1, 2, 3, 4',
        vt: 'WQT-VT-003', rt: 'CEC-2025/IND/AUG/OPCO-012' },
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-252-001', certDate: '2026-01-15', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '2" (60.3mm)', thkTested: '5.54mm', odQualified: 'OD \u2265 25mm', thkQualified: '11.08mm',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-001' }
    ] },
    { stamp: 'W-005', name: 'Ihab Samour', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-007', certDate: '2025-07-30', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '2" (60.3mm)', thkTested: '5.54mm', odQualified: 'OD \u2265 1"', thkQualified: '11.08mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-002', rt: 'CEC-2025-003' }
    ] },
    { stamp: 'W-006', name: 'Amer Fayyad', qualifications: [
      { type: 'gtaw-smaw', cert: 'OPCO-UTD-WQT-010', certDate: '2025-09-28', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '1-)2mm, 2-)5.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '1-)4mm max, 2-)10.22mm max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)ER70S-6, 2-)E7018-1', fillerSpec: 'SFA 5.18 & SFA 5.1', fillerFno: '1-)F No. 6, 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-004', rt: 'CEC-2025/IND/SEP/OPCO-013' },
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-012', certDate: '2025-09-28', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '1/2" (21.3mm)', thkTested: '4.78 mm', odQualified: 'OD \u2265 1/2"', thkQualified: '9.56 mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-004', rt: 'CEC-2025/IND/SEP/OPCO-013' },
      { type: 'gtaw-ss', cert: 'OPCO-UTD-WQT-SS-006', wps: 'OPCO-UTD-251-QCD-GN-WPS-005',
        odTested: '3/4" (26.7mm)', thkTested: '3.91mm', odQualified: 'OD \u2265 3/4"', thkQualified: '7.82 mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER347', fillerSpec: 'SFA 5.9', fillerFno: 'F No. 6',
        material: 'A312 TP304 / TP316', materialQualified: 'P No. 8 (Stainless Steel)',
        vt: 'WQT-VT-004', rt: 'CEC-2025/IND/SEP/OPCO-013' }
    ] },
    { stamp: 'W-007', name: 'Mohammad Kanafani', qualifications: [
      { type: 'gtaw-smaw', cert: 'OPCO-UTD-WQT-011', certDate: '2025-09-28', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '1-)2mm, 2-)5.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '1-)4mm max, 2-)10.22mm max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)ER70S-6, 2-)E7018-1', fillerSpec: 'SFA 5.18 & SFA 5.1', fillerFno: '1-)F No. 6, 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-004', rt: 'CEC-2025/IND/SEP/OPCO-013' },
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-013', certDate: '2025-09-28', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '1/2" (21.3mm)', thkTested: '4.78 mm', odQualified: 'OD \u2265 1/2"', thkQualified: '9.56 mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-004', rt: 'CEC-2025/IND/SEP/OPCO-013' },
      { type: 'gtaw-ss', cert: 'OPCO-UTD-WQT-SS-007', wps: 'OPCO-UTD-251-QCD-GN-WPS-005',
        odTested: '1/2" (21.3mm)', thkTested: '3.73mm', odQualified: 'OD \u2265 1/2"', thkQualified: '7.46 mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER347', fillerSpec: 'SFA 5.9', fillerFno: 'F No. 6',
        material: 'A312 TP304 / TP316', materialQualified: 'P No. 8 (Stainless Steel)',
        vt: 'WQT-VT-004', rt: 'CEC-2025/IND/SEP/OPCO-013' }
    ] },
    { stamp: 'W-008', name: 'Ahmed Ezzi', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-252-015', certDate: '2026-01-22', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '2" (60.3mm)', thkTested: '5.54mm', odQualified: 'OD \u2265 25mm', thkQualified: '11.08mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-003', rt: '2026-MLTP-RT-OPCO-005' },
      { type: 'gtaw-smaw', cert: 'OPCO-UTD-WQT-252-016', certDate: '2026-01-20', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '1-)2mm, 2-)5.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '1-)4mm max, 2-)10.22mm max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)ER70S-6, 2-)E7018-1', fillerSpec: 'SFA 5.18 & SFA 5.1', fillerFno: '1-)F No. 6, 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-002', rt: '2026-MLTP-RT-OPCO-004' }
    ] },
    { stamp: 'W-009', name: 'Husam Hamza', qualifications: [
      { type: 'gtaw-smaw', cert: 'OPCO-UTD-WQT-014', certDate: '2026-03-03', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '1-)2mm, 2-)5.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '1-)4mm max, 2-)10.22mm max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)ER70S-6, 2-)E7018-1', fillerSpec: 'SFA 5.18 & SFA 5.1', fillerFno: '1-)F No. 6, 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-016', rt: '2026-MLTP-RT-OPCO-025' },
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-015', certDate: '2026-03-03', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '3/4" (26.7mm)', thkTested: '5.56', odQualified: 'OD \u2265 3/4"', thkQualified: '11.02 mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-017', rt: '2026-MLTP-RT-OPCO-026' }
    ] },
    { stamp: 'W-010', name: 'Omar Rajoob', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-016', certDate: '2026-03-03', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '3/4" (26.7mm)', thkTested: '5.56', odQualified: 'OD \u2265 3/4"', thkQualified: '11.02 mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-019', rt: '2026-MLTP-RT-OPCO-026' }
    ] },
    { stamp: 'W-011', name: 'Cihad Mohammad', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-252-017', certDate: '2026-01-22', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '2" (60.3mm)', thkTested: '5.54mm', odQualified: 'OD \u2265 25mm', thkQualified: '11.08mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-003', rt: '2026-MLTP-RT-OPCO-005' },
      { type: 'gtaw-smaw', cert: 'OPCO-UTD-WQT-252-018', certDate: '2026-01-20', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '1-)2mm, 2-)5.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '1-)4mm max, 2-)10.22mm max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)ER70S-6, 2-)E7018-1', fillerSpec: 'SFA 5.18 & SFA 5.1', fillerFno: '1-)F No. 6, 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-002', rt: '2026-MLTP-RT-OPCO-004' }
    ] },
    { stamp: 'W-012', name: 'Ali Bagheri', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-252-002', certDate: '2026-01-15', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '2" (60.3mm)', thkTested: '5.54mm', odQualified: 'OD \u2265 25mm', thkQualified: '11.08mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-001' },
      { type: 'gtaw-smaw', cert: 'OPCO-UTD-WQT-252-003', certDate: '2026-01-15', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '1-)2mm, 2-)5.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '1-)4mm max, 2-)10.22mm max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)ER70S-6, 2-)E7018-1', fillerSpec: 'SFA 5.18 & SFA 5.1', fillerFno: '1-)F No. 6, 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-001' },
      { type: 'smaw', cert: 'OPCO-UTD-WQT-252-004', certDate: '2026-01-15', wps: 'OPCO-UTD-252-QCD-00-WPS-001',
        odTested: '6" (168mm)', thkTested: '7.11', odQualified: 'OD \u2265 73 mm', thkQualified: '14.22 max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)E6010, 2-)E7018-1', fillerSpec: 'SFA 5.1', fillerFno: '1-)F No. 1,2, 3 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-001' }
    ] },
    { stamp: 'W-013', name: 'Mehdad Fathi', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-252-005', certDate: '2026-01-20', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '2" (60.3mm)', thkTested: '5.54mm', odQualified: 'OD \u2265 25mm', thkQualified: '11.08mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-002', rt: '2026-MLTP-RT-OPCO-003' },
      { type: 'gtaw-smaw', cert: 'OPCO-UTD-WQT-252-006', certDate: '2026-01-15', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '1-)2mm, 2-)5.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '1-)4mm max, 2-)10.22mm max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)ER70S-6, 2-)E7018-1', fillerSpec: 'SFA 5.18 & SFA 5.1', fillerFno: '1-)F No. 6, 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-001' },
      { type: 'smaw', cert: 'OPCO-UTD-WQT-252-007', certDate: '2026-01-15', wps: 'OPCO-UTD-252-QCD-00-WPS-001',
        odTested: '6" (168mm)', thkTested: '7.11', odQualified: 'OD \u2265 73 mm', thkQualified: '14.22 max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)E6010, 2-)E7018-1', fillerSpec: 'SFA 5.1', fillerFno: '1-)F No. 1,2, 3 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-001' }
    ] },
    { stamp: 'W-014', name: 'Akbar Ahmedi', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-252-008', certDate: '2026-01-15', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '2" (60.3mm)', thkTested: '5.54mm', odQualified: 'OD \u2265 25mm', thkQualified: '11.08mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-002' },
      { type: 'smaw', cert: 'OPCO-UTD-WQT-252-009', certDate: '2026-01-15', wps: 'OPCO-UTD-252-QCD-00-WPS-001',
        odTested: '6" (168mm)', thkTested: '7.11', odQualified: 'OD \u2265 73 mm', thkQualified: '14.22 max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)E6010, 2-)E7018-1', fillerSpec: 'SFA 5.1', fillerFno: '1-)F No. 1,2, 3 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-001' }
    ] },
    { stamp: 'W-015', name: 'Hadi Kahmazniya', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-252-010', certDate: '2026-01-15', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '2" (60.3mm)', thkTested: '5.54mm', odQualified: 'OD \u2265 25mm', thkQualified: '11.08mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-002' },
      { type: 'gtaw-smaw', cert: 'OPCO-UTD-WQT-252-011', certDate: '2026-01-15', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '1-)2mm, 2-)5.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '1-)4mm max, 2-)10.22mm max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)ER70S-6, 2-)E7018-1', fillerSpec: 'SFA 5.18 & SFA 5.1', fillerFno: '1-)F No. 6, 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-001' },
      { type: 'smaw', cert: 'OPCO-UTD-WQT-252-012', certDate: '2026-01-15', wps: 'OPCO-UTD-252-QCD-00-WPS-001',
        odTested: '6" (168mm)', thkTested: '7.11', odQualified: 'OD \u2265 73 mm', thkQualified: '14.22 max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)E6010, 2-)E7018-1', fillerSpec: 'SFA 5.1', fillerFno: '1-)F No. 1,2, 3 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-001' }
    ] },
    { stamp: 'W-016', name: 'Hussein Akbari', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-252-013', certDate: '2026-01-15', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '2" (60.3mm)', thkTested: '5.54mm', odQualified: 'OD \u2265 25mm', thkQualified: '11.08mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-002' },
      { type: 'gtaw-smaw', cert: 'OPCO-UTD-WQT-252-014', certDate: '2026-01-15', wps: 'OPCO-UTD-251-QCD-00-WPS-002',
        odTested: '6" (168mm)', thkTested: '1-)2mm, 2-)5.11mm', odQualified: 'OD \u2265 73 mm', thkQualified: '1-)4mm max, 2-)10.22mm max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)ER70S-6, 2-)E7018-1', fillerSpec: 'SFA 5.18 & SFA 5.1', fillerFno: '1-)F No. 6, 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-001', rt: '2026-MLTP-RT-OPCO-001' }
    ] },
    { stamp: 'W-017', name: 'Kasim Hassan', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-252-020', certDate: '2026-02-24', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '2" (60.3mm)', thkTested: '5.54mm', odQualified: 'OD \u2265 25mm', thkQualified: '11.08mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-024-026', rt: '2026-HB-OP-RT-001' },
      { type: 'smaw', cert: 'OPCO-UTD-WQT-252-021', certDate: '2026-02-24', wps: 'OPCO-UTD-252-QCD-00-WPS-001',
        odTested: '6" (168mm)', thkTested: '7.11', odQualified: 'OD \u2265 73 mm', thkQualified: '14.22 max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)E6010, 2-)E7018-1', fillerSpec: 'SFA 5.1', fillerFno: '1-)F No. 1,2, 3 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-024-026', rt: '2026-HB-OP-RT-001' }
    ] },
    { stamp: 'W-018', name: 'Jasem Gulam', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-252-022', certDate: '2026-02-24', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '2" (60.3mm)', thkTested: '5.54mm', odQualified: 'OD \u2265 25mm', thkQualified: '11.08mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-025-027', rt: '2026-HB-OP-RT-001' },
      { type: 'smaw', cert: 'OPCO-UTD-WQT-252-023', certDate: '2026-02-24', wps: 'OPCO-UTD-252-QCD-00-WPS-001',
        odTested: '6" (168mm)', thkTested: '7.11', odQualified: 'OD \u2265 73 mm', thkQualified: '14.22 max',
        backingTested: '1-)Without, 2-)With', backingQualified: '1-)With and Without, 2-)With',
        electrical: '1-)DCEN, 2-)DCEP', filler: '1-)E6010, 2-)E7018-1', fillerSpec: 'SFA 5.1', fillerFno: '1-)F No. 1,2, 3 2-)F No. 1, 2, 3, 4',
        vt: 'WQT-VT-025-027', rt: '2026-HB-OP-RT-001' }
    ] },
    { stamp: 'W-019', name: 'Ramin Tahmezniya', qualifications: [
      { type: 'tack', cert: 'OPCO-UTD-WQT-252-024', certDate: '2026-03-09', wps: 'OPCO-CRE-241-QCD-00-SPC-001',
        odTested: 'Fillet (2F)', thkTested: 'N/A', odQualified: 'Tack Weld Only', thkQualified: 'All',
        backingTested: 'Without', backingQualified: 'Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-028-029', rt: 'N/A',
        position: '2F \u2192 F, H', joint: 'Fillet Weld', material: 'S355JR to A106 Gr.B', materialQualified: 'P No. 1 to P No. 1',
        approvedBy: 'PPCL', destructive: 'Nick Break + Macro: ACC' }
    ] },
    { stamp: 'W-020', name: 'Emir Hussein', qualifications: [
      { type: 'tack', cert: 'OPCO-UTD-WQT-252-025', certDate: '2026-03-09', wps: 'OPCO-CRE-241-QCD-00-SPC-001',
        odTested: 'Fillet (2F)', thkTested: 'N/A', odQualified: 'Tack Weld Only', thkQualified: 'All',
        backingTested: 'Without', backingQualified: 'Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-028-029', rt: 'N/A',
        position: '2F \u2192 F, H', joint: 'Fillet Weld', material: 'S355JR to A106 Gr.B', materialQualified: 'P No. 1 to P No. 1',
        approvedBy: 'PPCL', destructive: 'Nick Break + Macro: ACC' }
    ] },
    { stamp: 'W-021', name: 'Mohammad Ali', qualifications: [
      { type: 'gtaw', cert: 'OPCO-UTD-WQT-021', certDate: '2026-04-23', wps: 'OPCO-UTD-251-QCD-00-WPS-001',
        odTested: '3/4" (26.7mm)', thkTested: '5.56', odQualified: 'OD \u2265 3/4"', thkQualified: '11.12 mm max',
        backingTested: 'Without', backingQualified: 'With and Without',
        electrical: 'DCEN', filler: 'ER70S-6', fillerSpec: 'SFA 5.18', fillerFno: 'F No. 6',
        vt: 'WQT-VT-021', rt: '2026-HB-RT-UR-33' }
    ] }
  ];

  // Common qualification scope shared by all (non-tack) Piping welders
  var PIPING_WELDER_SCOPE = {
    project: 'Hydrotreater Unit + OSBL Project (United Refinery)',
    company: 'OPCO',
    client: 'United Refinery',
    referenceDoc: 'ASME Sec. IX',
    position: { tested: '6G', qualified: 'All Position' },
    progression: 'Uphill for All Passes',
    jointType: { tested: 'Butt Weld', qualified: 'All' },
    material: { tested: 'A106 Gr.B', qualified: 'P No. 1 through P No. 15F, P No. 34, P No. 41 through P No. 49' },
    shieldingGas: 'N/A',
    finalResult: 'QUALIFIED'
  };

  var welderPpSelectedStamp = null;

  function pipingProcessLabel(type) {
    if (type === 'gtaw')      return 'GTAW';
    if (type === 'smaw')      return 'SMAW';
    if (type === 'gtaw-smaw') return 'GTAW + SMAW';
    if (type === 'tack')      return 'GTAW (Tack)';
    if (type === 'gtaw-ss')   return 'GTAW (SS)';
    return type;
  }
  function pipingProcessPillClass(type) {
    if (type === 'gtaw')      return '';                  // base blue
    if (type === 'gtaw-smaw') return 'process-combo';     // green
    if (type === 'smaw')      return 'process-smaw';      // red
    if (type === 'tack')      return 'process-tack';      // purple
    if (type === 'gtaw-ss')   return 'process-ss';        // teal
    return '';
  }

  // Build a vertical list of process pills for the table row. Always padded to
  // exactly 3 rows with invisible placeholder pills, so that every welder row
  // in the Piping table has the same fixed height regardless of how many
  // qualifications they have.
  function pipingProcessPills(quals) {
    var html = '<span class="welder-process-pills">';
    quals.forEach(function(q) {
      html += '<span class="welder-process-pill ' + pipingProcessPillClass(q.type) + '">'
           +  pipingProcessLabel(q.type) + '</span>';
    });
    // Pad to 3 slots with invisible pills so the row height is uniform.
    var emptySlots = Math.max(0, 3 - quals.length);
    for (var i = 0; i < emptySlots; i++) {
      html += '<span class="welder-process-pill process-empty"></span>';
    }
    html += '</span>';
    return html;
  }

  // Aggregate the OD range across all of a welder's qualifications, picking
  // the smallest "lower bound" so the displayed range reflects the union.
  // For tack-only welders we just show "Tack only".
  function pipingAggregateOdRange(quals) {
    if (quals.length === 1 && quals[0].type === 'tack') return 'Tack only';
    // Use the smallest qualified OD lower bound (1/2" < 3/4" < 1" < 25mm < 73mm)
    var ranks = { '1/2': 1, '3/4': 2, '1"': 3, '25': 4, '73': 5 };
    var best = null, bestRank = 99;
    quals.forEach(function(q) {
      if (q.type === 'tack') return;
      var od = q.odQualified;
      var r = 99;
      if (od.indexOf('1/2"') !== -1) r = 1;
      else if (od.indexOf('3/4"') !== -1) r = 2;
      else if (od.indexOf('1"') !== -1) r = 3;
      else if (od.indexOf('25mm') !== -1) r = 4;
      else if (od.indexOf('25 mm') !== -1) r = 4;
      else if (od.indexOf('73 mm') !== -1 || od.indexOf('73mm') !== -1) r = 5;
      if (r < bestRank) { bestRank = r; best = od; }
    });
    return best || quals[0].odQualified;
  }

  // Aggregate thickness: pick the largest qualified upper bound.
  function pipingAggregateThkRange(quals) {
    if (quals.length === 1 && quals[0].type === 'tack') return '\u2014';
    var best = null, bestVal = -1;
    quals.forEach(function(q) {
      if (q.type === 'tack') return;
      // Extract first number from thkQualified (handles "10.22mm max", "14.22 max", "1-)4mm max, 2-)10.22mm max", etc.)
      var matches = q.thkQualified.match(/(\d+\.?\d*)/g);
      if (!matches) return;
      var maxNum = 0;
      matches.forEach(function(m) { var n = parseFloat(m); if (n > maxNum) maxNum = n; });
      if (maxNum > bestVal) { bestVal = maxNum; best = q.thkQualified; }
    });
    return best || quals[0].thkQualified;
  }

  // Latest cert date across qualifications — what we show in the row.
  function pipingLatestCertDate(quals) {
    var latest = null;
    quals.forEach(function(q) {
      if (!latest || q.certDate > latest) latest = q.certDate;
    });
    return latest;
  }

  function renderPipingWelderTable(filter) {
    var tbody = document.getElementById('welder-pp-q-tbody');
    var countEl = document.getElementById('welder-pp-count');
    if (!tbody) return;
    var q = (filter || '').trim().toLowerCase();
    var rows = PIPING_WELDERS.filter(function(w) {
      if (!q) return true;
      return w.name.toLowerCase().indexOf(q) !== -1
          || w.stamp.toLowerCase().indexOf(q) !== -1;
    });

    var html = '';
    rows.forEach(function(w) {
      var isTackOnly = w.qualifications.length === 1 && w.qualifications[0].type === 'tack';
      var position = isTackOnly ? '2F \u2192 F, H' : '6G \u2192 All Position';
      var activeClass = (welderPpSelectedStamp === w.stamp) ? ' class="active"' : '';

      html += '<tr data-stamp="' + w.stamp + '"' + activeClass + '>';
      var photoSrc = WELDER_PHOTOS['piping:' + w.stamp] || '';
      var photoHtml = photoSrc
        ? '<img class="welder-photo" src="' + photoSrc + '" alt="' + w.name + '" />'
        : '<div class="welder-photo welder-photo-empty"></div>';
      html += '<td class="welder-stamp welder-stamp-cell">' + photoHtml + '<div class="welder-stamp-text">' + w.stamp + '</div></td>';
      html += '<td class="welder-name">' + w.name + '</td>';
      html += '<td>' + pipingProcessPills(w.qualifications) + '</td>';
      html += '<td>' + position + '</td>';
      html += '<td>' + pipingAggregateOdRange(w.qualifications) + '</td>';
      html += '<td>' + pipingAggregateThkRange(w.qualifications) + '</td>';
      html += '</tr>';
    });
    tbody.innerHTML = html;

    if (countEl) {
      countEl.textContent = rows.length === PIPING_WELDERS.length
        ? PIPING_WELDERS.length + ' welders'
        : rows.length + ' of ' + PIPING_WELDERS.length + ' welders';
    }

    var trs = tbody.querySelectorAll('tr');
    trs.forEach(function(tr) {
      tr.addEventListener('click', function() {
        var stamp = tr.getAttribute('data-stamp');
        if (welderPpSelectedStamp === stamp) {
          welderPpSelectedStamp = null;
          var __p3 = document.getElementById('welder-pp-detail-panel'); if (__p3) __p3.innerHTML = '';
          var prev = tbody.querySelector('tr.active');
          if (prev) prev.classList.remove('active');
        } else {
          welderPpSelectedStamp = stamp;
          tbody.querySelectorAll('tr').forEach(function(r) { r.classList.remove('active'); });
          tr.classList.add('active');
          renderPipingWelderDetail(stamp);
        }
      });
    });
    // Auto-select first welder on first render.
    if (!welderPpSelectedStamp && rows.length) {
      welderPpSelectedStamp = rows[0].stamp;
      var firstTr = tbody.querySelector('tr');
      if (firstTr) firstTr.classList.add('active');
      renderPipingWelderDetail(rows[0].stamp);
    }
  }

  // Render a single qualification card inside the welder detail panel.
  function renderPipingQualificationCard(q, idx, total) {
    var s = PIPING_WELDER_SCOPE;
    var isTack = q.type === 'tack';
    var processLabel = pipingProcessLabel(q.type);
    var headerTitle = total > 1
      ? 'Qualification ' + (idx + 1) + ' of ' + total + ' \u2014 ' + processLabel
      : processLabel + ' qualification';

    var html = '<div class="welder-qual-card">';
    html += '  <div class="welder-qual-card-header">';
    html += '    <span class="welder-qual-card-title">' + headerTitle + '</span>';
    html += '    <span class="welder-qual-card-cert">' + q.cert + '</span>';
    html += '  </div>';

    html += '<div class="welder-detail-grid">';
    html += welderItem('Final result',        s.finalResult);
    html += welderItem('Qualified WPS',       q.wps);
    if (isTack) {
      html += welderItem('Position',          q.position);
      html += welderItem('Joint type',        q.joint + ' (Tack only)');
      html += welderItem('Material',          q.material + ' \u2192 ' + q.materialQualified);
      html += welderItem('Approved by',       q.approvedBy);
    } else {
      html += welderItem('Position',          s.position.tested + ' \u2192 ' + s.position.qualified);
      html += welderItem('Joint type',        s.jointType.tested + ' \u2192 ' + s.jointType.qualified);
      // Material can be overridden per-qualification (e.g. stainless steel uses
      // P-No 8 / ER347 instead of the carbon-steel A106 default in scope).
      var matTested    = q.material           || s.material.tested;
      var matQualified = q.materialQualified  || s.material.qualified;
      html += welderItem('Material',          matTested + ' \u2192 ' + matQualified);
      html += welderItem('Progression',       s.progression);
    }
    html += welderItem('Filler metal',        q.filler + ' (' + q.fillerSpec + ', ' + q.fillerFno + ')');
    html += welderItem('Pipe OD',             q.odTested + ' \u2192 ' + q.odQualified);
    html += welderItem('Wall thickness',      q.thkTested + ' \u2192 ' + q.thkQualified);
    html += welderItem('Backing',             q.backingTested + ' \u2192 ' + q.backingQualified);
    html += welderItem('Electrical',          q.electrical);
    html += welderItem('Shielding gas',       s.shieldingGas);
    html += '</div>';

    // NDT for this qualification
    html += '<div class="welder-detail-grid" style="margin-top: 8px;">';
    html += welderItem('VT report',           q.vt + ' \u2014 ACC');
    if (isTack) {
      html += welderItem('Destructive',       q.destructive);
    } else {
      html += welderItem('RT report',         q.rt + ' \u2014 ACC');
    }
    html += '</div>';

    html += '</div>';
    return html;
  }

  function renderPipingWelderDetail(stamp) {
    var panel = document.getElementById('welder-pp-detail-panel');
    if (!panel) return;
    var w = PIPING_WELDERS.find(function(x) { return x.stamp === stamp; });
    if (!w) { panel.style.display = 'none'; return; }
    var s = PIPING_WELDER_SCOPE;
    var isTackOnly = w.qualifications.length === 1 && w.qualifications[0].type === 'tack';

    var html = '';
    html += '<div class="welder-detail-header">';
    html += '  <div class="welder-detail-title">';
    html += '    <span class="welder-detail-name">' + w.name + '</span>';
    html += '    <span class="welder-detail-stamp">Stamp ' + w.stamp + '</span>';
    if (isTackOnly) html += '    <span class="welder-tack-badge" style="margin-left: 6px;">Tack only</span>';
    html += '  </div>';
    html += '  <button class="welder-detail-close" id="welder-pp-detail-close" title="Close">\u00d7</button>';
    html += '</div>';

    // Project / common info — shared across all qualifications
    html += '<div class="welder-detail-section-title">Project &amp; reference</div>';
    html += '<div class="welder-detail-grid">';
    html += welderItem('Project',             s.project);
    html += welderItem('Company / Client',    s.company + ' / ' + s.client);
    html += welderItem('Reference document',  s.referenceDoc);
    html += welderItem('# Qualifications',    String(w.qualifications.length));
    if (isTackOnly) html += welderItem('Scope',  'Tack welds only');
    html += '</div>';

    // One card per qualification — sorted by cert date so the row order is stable.
    html += '<div class="welder-detail-section-title">Qualifications</div>';
    var sortedQuals = w.qualifications.slice().sort(function(a, b) {
      return a.certDate < b.certDate ? -1 : (a.certDate > b.certDate ? 1 : 0);
    });
    sortedQuals.forEach(function(q, idx) {
      html += renderPipingQualificationCard(q, idx, sortedQuals.length);
    });

    panel.innerHTML = html;
    panel.style.display = '';

    var closeBtn = document.getElementById('welder-pp-detail-close');
    if (closeBtn) closeBtn.addEventListener('click', function() {
      welderPpSelectedStamp = null;
      panel.innerHTML = '';
      var tbody = document.getElementById('welder-pp-q-tbody');
      var prev = tbody && tbody.querySelector('tr.active');
      if (prev) prev.classList.remove('active');
    });
  }

  // Compute deposited weld metal area per joint cross-section.
  // Geometry follows Dr. Hussain Ali / orient-pipeline reference model:
  //   - Root + hot pass: fixed area (~30 mm²), independent of wall thickness — root
  //     and hot pass together fill the gap region plus a small reinforcement at the
  //     root. Performed back-to-back with the same method/consumable.
  //   - Fill + cap: groove area (above root) + cap reinforcement (cap height × top
  //     width). Performed with a different method/consumable (or sometimes the same).
  //   - The slider lets the user override the default geometric split when a specific
  //     WPS dictates a different distribution.
  function calculatePerJoint(od_mm, t_mm, r_mm, f_mm, angle_deg) {
    // Use the pass schedule as the single source of truth for mass calculation.
    // This ensures the per-joint cards, project totals, and pass breakdown all agree.
    var schedule = computePassSchedule(t_mm, r_mm, f_mm, angle_deg, od_mm);
    var rootHotMass = 0;
    var fillCapMass = 0;
    schedule.passes.forEach(function(pass) {
      if (pass.type === 'roothot' || pass.type === 'root' || pass.type === 'hot') {
        rootHotMass += pass.mass_kg;
      } else {
        fillCapMass += pass.mass_kg;
      }
    });
    return { gmaw: rootHotMass, fcaw: fillCapMass, root: rootHotMass, fill: fillCapMass };
  }

  // Suggest a typical root+hot share for given pipe geometry.
  // Calibrated to Dr. Hussain Ali / orient-pipeline reference data:
  //   - Root + hot pass are performed back-to-back with the same method/consumable
  //     and together cover a CONSTANT cross-section area (~30 mm²) regardless of wall
  //     thickness. They fill the gap region plus a small reinforcement at the root.
  //   - As wall thickness increases, fill+cap area grows but root+hot stays fixed,
  //     so the root+hot percentage of total drops.
  // This matches consumable-supplier reference calculations to ±0.5%.
  // ===== Method UI =====
  var methodRootSel = document.getElementById('method-root');
  var methodFillSel = document.getElementById('method-fill');
  var rootCardLabel = document.getElementById('root-card-label');
  var fillCardLabel = document.getElementById('fill-card-label');
  var rootTotalLabel = document.getElementById('root-total-label');
  var fillTotalLabel = document.getElementById('fill-total-label');

  function populateMethodDropdown(sel) {
    sel.innerHTML = '';
    Object.keys(METHODS).forEach(function(key) {
      var opt = document.createElement('option');
      opt.value = key;
      opt.textContent = METHODS[key].label + ' \u2014 ' + METHODS[key].description;
      sel.appendChild(opt);
    });
  }

  function updateMethodLabels() {
    var rootLabel = rootMethod.method;
    var fillLabel = fillMethod.method;
    rootCardLabel.textContent = rootLabel + ' (root + hot)';
    fillCardLabel.textContent = fillLabel + ' (fill + cap)';
    rootTotalLabel.textContent = rootLabel;
    fillTotalLabel.textContent = fillLabel;
  }

  // Initialize method dropdowns
  populateMethodDropdown(methodRootSel);
  populateMethodDropdown(methodFillSel);
  methodRootSel.value = rootMethod.method;
  methodFillSel.value = fillMethod.method;
  updateMethodLabels();

  methodRootSel.addEventListener('change', function() {
    rootMethod.method = methodRootSel.value;
    updateMethodLabels();
    calc();
  });
  methodFillSel.addEventListener('change', function() {
    fillMethod.method = methodFillSel.value;
    updateMethodLabels();
    calc();
  });

  // Single pipe tab
  var npsSel = document.getElementById('nps');
  var schSel = document.getElementById('sch');
  var ro = document.getElementById('ro');
  var rf = document.getElementById('rf');
  var ang = document.getElementById('ang');
  var len = document.getElementById('len');
  var repairSlider = document.getElementById('repair');

  var odOut = document.getElementById('od-out');
  var roOut = document.getElementById('ro-out');
  var rfOut = document.getElementById('rf-out');
  var angOut = document.getElementById('ang-out');
  var lenOut = document.getElementById('len-out');
  var repairOut = document.getElementById('repair-out');
  var gmawOut = document.getElementById('gmaw-out');
  var fcawOut = document.getElementById('fcaw-out');
  var jointsOut = document.getElementById('joints-out');
  var gmawTotal = document.getElementById('gmaw-total');
  var fcawTotal = document.getElementById('fcaw-total');
  var combinedOut = document.getElementById('combined-out');
  var wtInput = document.getElementById('wt-input');
  var wtDisplayEl = document.getElementById('wt-display');
  var wtHint = document.getElementById('wt-hint');

  function setAttrs(id, attrs) {
    var el = document.getElementById(id);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
  }

  for (var i = 0; i < PIPE_DATA.length; i++) {
    var p = PIPE_DATA[i];
    var opt = document.createElement('option');
    opt.value = i;
    var npsLabel = p.nps < 1 ? p.nps : (p.nps % 1 === 0 ? p.nps.toFixed(0) : p.nps);
    opt.textContent = npsLabel + '" (' + p.od_mm + ' mm OD)';
    npsSel.appendChild(opt);
  }
  var defaultIdx = -1;
  for (var j = 0; j < PIPE_DATA.length; j++) {
    if (PIPE_DATA[j].nps === 20) { defaultIdx = j; break; }
  }
  npsSel.value = defaultIdx >= 0 ? defaultIdx : 0;

  function populateSchedules() {
    var idx = parseInt(npsSel.value);
    var pipe = PIPE_DATA[idx];
    schSel.innerHTML = '';
    for (var k = 0; k < SCH_ORDER.length; k++) {
      var s = SCH_ORDER[k];
      if (pipe.schedules[s] !== undefined) {
        var o = document.createElement('option');
        o.value = s;
        o.textContent = 'SCH ' + s + ' \u2014 ' + pipe.schedules[s] + ' mm';
        schSel.appendChild(o);
      }
    }
    var customOpt = document.createElement('option');
    customOpt.value = 'CUSTOM';
    customOpt.textContent = 'Custom thickness\u2026';
    schSel.appendChild(customOpt);
    if (pipe.schedules['STD'] !== undefined) schSel.value = 'STD';
  }

  function handleScheduleChange() {
    if (schSel.value === 'CUSTOM') {
      wtDisplayEl.style.display = 'none';
      wtInput.style.display = 'block';
      wtHint.textContent = '\u2014 enter manually';
      if (!wtInput.value) {
        var pipe = PIPE_DATA[parseInt(npsSel.value)];
        var stdT = pipe.schedules['STD'] || Object.values(pipe.schedules)[0];
        wtInput.value = stdT;
      }
      wtInput.focus();
      wtInput.select();
    } else {
      wtDisplayEl.style.display = 'block';
      wtInput.style.display = 'none';
      wtHint.textContent = '';
    }
    calc();
  }

  function getCurrentThickness() {
    if (schSel.value === 'CUSTOM') {
      var v = parseFloat(wtInput.value);
      return (isNaN(v) || v <= 0) ? 9.52 : v;
    }
    var pipe = PIPE_DATA[parseInt(npsSel.value)];
    return pipe.schedules[schSel.value];
  }

  function calc() {
    var pipe = PIPE_DATA[parseInt(npsSel.value)];
    var t = getCurrentThickness();
    var od = pipe.od_mm;
    var r = parseFloat(ro.value);
    var f = parseFloat(rf.value);
    var a = parseFloat(ang.value);
    var l = parseFloat(len.value);
    var repair = parseFloat(repairSlider.value);
    var totalFactor = WASTE * (1 + repair / 100);

    var per = calculatePerJoint(od, t, r, f, a);
    var joints = Math.round(l / PIPE_LENGTH);
    var gmawPerJointWithFactor = per.gmaw * totalFactor;
    var fcawPerJointWithFactor = per.fcaw * totalFactor;
    var gmawProject = gmawPerJointWithFactor * joints;
    var fcawProject = fcawPerJointWithFactor * joints;
    var combined = gmawProject + fcawProject;

    odOut.textContent = od + ' mm';
    wtDisplayEl.textContent = t.toFixed(2) + ' mm';
    roOut.textContent = r.toFixed(1) + ' mm';
    rfOut.textContent = f.toFixed(1) + ' mm';
    angOut.textContent = a + '\u00B0';
    lenOut.textContent = Math.round(l).toLocaleString() + ' m';
    repairOut.textContent = repair + '%';

    gmawOut.textContent = gmawPerJointWithFactor.toFixed(2) + ' kg';
    fcawOut.textContent = fcawPerJointWithFactor.toFixed(2) + ' kg';
    jointsOut.textContent = joints.toLocaleString();
    gmawTotal.textContent = Math.round(gmawProject).toLocaleString() + ' kg';
    fcawTotal.textContent = Math.round(fcawProject).toLocaleString() + ' kg';
    combinedOut.textContent = Math.round(combined).toLocaleString() + ' kg';

    var rootFace = Math.min(f, t * 0.6);
    drawBevel(t, r, rootFace, a);

    updateMTOTotals();
  }

  // Pass deposition characteristics — calibrated from Dr. Hussain Ali's reference data.
  //
  // Dr. Hussain's pipeline NOP model:
  //   NOP (fill/cap pass count) = ROUND( (T - RT) / PT )    (Excel ROUND, half-up)
  //
  //   RT = Root Thickness (mm) — depth from ID covered by the root pass
  //        (or root+hot together for STT). Pipe-specific in Hussain's reference,
  //        approximately: 3 mm for thinner walls, 4 mm for thicker walls.
  //
  //   PT = Pass Thickness (mm) — depth advanced by ONE fill/cap pass, method-specific.
  //
  // For pipeline butt welds in the typical pipeline size range (8-20" NPS, 75° bevel),
  // each layer is exactly 1 weld pass — bevel widths never exceed ~3× consumable diameter.
  // Side-by-side multi-pass only happens on heavier walls / wider grooves.
  var PASS_TYPICAL = {
    // RT lookup — based on wall thickness; matches Hussain reference data
    rootThicknessForT: function(t_mm) {
      // Hussain reference: 8.18→3, 9.27→4, 9.53→3, 10.31→4, 11.13→4, 11.91→4
      // Closest fit: T<9.0 or (T~9.5 with thin schedule) → 3, else → 4
      // Practical default: T ≤ 9.0 mm → 3 mm, otherwise 4 mm
      // Special case: 9.5 mm wall (20" STD) uses 3 mm in Hussain — we treat T < 9.6 as 3 mm
      if (t_mm <= 9.0) return 3.0;
      if (t_mm < 9.6) return 3.0;  // covers 20" STD 9.53mm
      return 4.0;
    },
    passThickness: {  // PT — depth advanced by ONE fill/cap pass (mm)
      GMAW: 3.0,
      FCAW: 3.0,      // matches Hussain PT=3
      SMAW: 2.0,      // matches Hussain PT=2
      GTAW: 2.0,      // matches Hussain PT=2
      SAW: 3.0        // matches Hussain PT=3
    },
    // VISUAL pass thickness — calibrated against real PQR data (sahada ne kullanılıyor).
    // Used ONLY for determining how many layers to DRAW in the bevel cross-section.
    // Mass calculation still uses passThickness (Hussain) for consumable accuracy.
    // Real WPS uses thicker fill passes than Hussain's conservative estimate.
    passThicknessVisual: {
      GMAW: 3.0,
      FCAW: 3.5,      // FCAW with weave technique
      SMAW: 3.2,      // 3.2mm SMAW electrode realistic deposit
      GTAW: 1.8,      // GTAW thinner for quality (sour service)
      SAW: 4.0
    },
    consumableDia: {  // for side-by-side pass count when bevel is wide
      GMAW: 1.2,
      FCAW: 1.6,
      SMAW: 3.25,
      GTAW: 2.4,
      SAW: 4.0
    }
  };
  // Compute max single-pass width — method-specific multiplier of consumable diameter.
  // Different processes deposit beads of different widths due to weave technique,
  // shielding, and arc characteristics:
  //   - GMAW (STT/spray):      ~3× wire dia (narrow, stringer beads typical)
  //   - FCAW:                  ~6× wire dia (weaving allows wide single-pass coverage)
  //   - SMAW:                  ~3× electrode dia (limited weave)
  //   - GTAW:                  ~3× rod dia (narrow, hand-paced)
  //   - SAW:                   ~5× wire dia (broad, automated)
  var PASS_WIDTH_MULT = {
    GMAW: 3.0,
    FCAW: 6.0,
    SMAW: 3.0,
    GTAW: 3.0,
    SAW: 5.0
  };
  function passWidthForMethod(methodKey) {
    var dia = PASS_TYPICAL.consumableDia[methodKey] || 3.0;
    var mult = PASS_WIDTH_MULT[methodKey] || 3.0;
    return dia * mult;
  }
  // Number of side-by-side passes for a layer of given width
  function passesInLayer(layerWidth_mm, methodKey) {
    var pw = passWidthForMethod(methodKey);
    if (layerWidth_mm <= pw) return 1;
    return Math.ceil(layerWidth_mm / pw);
  }

  // Pass layer color palette (root → cap)
  var PASS_COLORS = {
    root: { fill: '#1c3d6e', stroke: '#0e2d5a', label: 'white' },
    hot:  { fill: '#3470b8', stroke: '#1c3d6e', label: 'white' },
    roothot: { fill: '#2456a0', stroke: '#0e2d5a', label: 'white' }, // STT combined — between root and hot
    fill: [
      { fill: '#e8a558', stroke: '#c87f3a', label: '#5d3a1a' },
      { fill: '#eeb069', stroke: '#c87f3a', label: '#5d3a1a' },
      { fill: '#f4bd80', stroke: '#c87f3a', label: '#5d3a1a' },
      { fill: '#f7c898', stroke: '#c87f3a', label: '#5d3a1a' },
      { fill: '#fad3ad', stroke: '#c87f3a', label: '#5d3a1a' },
      { fill: '#fcdcc0', stroke: '#c87f3a', label: '#5d3a1a' }
    ],
    cap:  { fill: '#7da66f', stroke: '#5d8a4f', label: 'white' }
  };

  // Compute pass schedule for current geometry + methods.
  // Calibrated to Dr. Hussain Ali's NOP = (T - RT) / PT formula.
  //   - 1 root layer (depth RT, fills gap area ~30 mm² regardless of T)
  //   - N fill/cap layers, each advancing depth by PT (method-specific)
  //   - Total fill layers = ceil((T - RT) / PT)
  //   - The final fill layer doubles as the cap (it sits at the top with cap reinforcement)
  //   - Each layer is normally 1 pass; only wide bevels need side-by-side passes
  function computePassSchedule(t_mm, r_mm, f_mm, angle_deg, od_mm) {
    var rootFace = Math.min(f_mm, t_mm * 0.6);
    var halfRad = (angle_deg / 2) * Math.PI / 180;
    var tanHalf = Math.tan(halfRad);
    function areaAtDepth(h) {
      if (h <= 0) return 0;
      if (h <= rootFace) return r_mm * h;
      var aboveRf = h - rootFace;
      return r_mm * rootFace + r_mm * aboveRf + Math.pow(aboveRf, 2) * tanHalf;
    }
    function widthAtDepth(h) {
      if (h <= rootFace) return r_mm;
      return r_mm + 2 * (h - rootFace) * tanHalf;
    }
    function midWidth(depthFrom, depthTo) {
      return (widthAtDepth(depthFrom) + widthAtDepth(depthTo)) / 2;
    }
    var totalGroove = areaAtDepth(t_mm);
    var topWidth = r_mm + 2 * (t_mm - rootFace) * tanHalf;
    var capArea = CAP_HEIGHT * topWidth;

    var rootHotMethodKey = rootMethod.method;
    var fillMethodKey = fillMethod.method;
    var combineRootHot = (rootHotMethodKey === 'GMAW');
    // RT (Root Thickness) is pipe-thickness-based, not method-based — matches Hussain reference
    var rootDepth = PASS_TYPICAL.rootThicknessForT(t_mm);
    var passDepth = PASS_TYPICAL.passThickness[fillMethodKey] || 3.0;

    var passes = [];

    // ===== Root layer =====
    // Calibrated to Dr. Hussain Ali's reference: ROOT pass deposits 30 mm² regardless
    // of wall thickness. This corresponds to ~5.6mm depth in a 75°/2.4mm/1mm bevel —
    // larger than the "RT" parameter used for NOP counting (which is 3 or 4 mm).
    // The geometric area IS the deposit area (no separate reinforcement bulge).
    // For GMAW (STT): this matches exactly — STT root pass is ~5.6mm thick.
    // For SMAW/GTAW/SAW: still treated as 30 mm² root (root + hot together).
    // ===== Root layer(s) =====
    // Calibrated to Dr. Hussain Ali's reference: ROOT pass deposits 30 mm² regardless
    // of wall thickness. This corresponds to ~5.6mm depth in a 75°/2.4mm/1mm bevel.
    // For GMAW (STT): root and hot are deposited as ONE thick pass (~30 mm² combined).
    // For SMAW/GTAW/SAW: root and hot are SEPARATE passes:
    //   - Root pass: ~12 mm² (lower, narrower, mostly the gap region)
    //   - Hot pass: ~18 mm² (above root, wider, fills toward the bevel walls)
    //   - Together: 30 mm² (matches Hussain's combined root area)
    var ROOT_PASS_AREA_FIXED = 30; // mm² — Hussain reference calibration
    var depth_rh = invertAreaAtDepth(ROOT_PASS_AREA_FIXED, r_mm, rootFace, tanHalf, t_mm);
    if (depth_rh > t_mm) depth_rh = t_mm;

    if (combineRootHot) {
      // GMAW (STT): single combined pass — STT root is always single pass
      var rhArea = areaAtDepth(depth_rh);
      var rhWidth = midWidth(0, depth_rh);
      passes.push({
        type: 'roothot', name: 'Root + Hot', area: rhArea,
        depthFrom: 0, depthTo: depth_rh, methodKey: rootHotMethodKey,
        layerWidth: rhWidth, passCount: 1
      });
    } else {
      // SMAW/GTAW/SAW: separate root and hot passes
      // Split root region (~12 mm²) vs hot region (~18 mm²) by area
      var ROOT_AREA = 12;  // mm² — bottom portion (gap-dominated)
      var depth_root = invertAreaAtDepth(ROOT_AREA, r_mm, rootFace, tanHalf, t_mm);
      if (depth_root > depth_rh) depth_root = depth_rh;
      var rootArea = areaAtDepth(depth_root);
      var rootW = midWidth(0, depth_root);
      passes.push({
        type: 'root', name: 'Root', area: rootArea,
        depthFrom: 0, depthTo: depth_root, methodKey: rootHotMethodKey,
        layerWidth: rootW, passCount: 1   // Root pass is always single-pass (fills gap)
      });
      var hotArea = areaAtDepth(depth_rh) - rootArea;
      var hotW = midWidth(depth_root, depth_rh);
      passes.push({
        type: 'hot', name: 'Hot', area: hotArea,
        depthFrom: depth_root, depthTo: depth_rh, methodKey: rootHotMethodKey,
        layerWidth: hotW, passCount: 1   // Hot pass is always single-pass (narrow region)
      });
    }
    var rootHotTotalArea = areaAtDepth(depth_rh);  // total root+hot area for fill calc

    // ===== Fill layers (entirely inside the bevel, below OD line) =====
    // ===== Fill layers (entirely inside the bevel, below OD line) =====
    // Layer count is calibrated to real WPS practice (PQR data) — uses passThicknessVisual.
    // Total mass is preserved because each layer's area is computed geometrically;
    // the SUM of all layer areas equals the bevel cavity area regardless of layer count.
    // ALL bevel-internal layers are 'fill' — even the topmost one just below OD.
    // The cap is ONLY the reinforcement arc ABOVE the OD line (separate entry).
    var visualPT = PASS_TYPICAL.passThicknessVisual[fillMethodKey] || passDepth;
    var nopRegionDepth = t_mm - rootDepth;       // Hussain RT-based for layer count
    var nLayers = Math.max(1, Math.floor(nopRegionDepth / visualPT + 0.5));

    // Distribute fill layers evenly across the actual fill region (depth_rh → t_mm)
    var layerStep = (t_mm - depth_rh) / nLayers;
    var prevDepth = depth_rh;
    var prevArea = rootHotTotalArea;
    for (var i = 0; i < nLayers; i++) {
      var isLast = (i === nLayers - 1);
      var nextDepth = isLast ? t_mm : prevDepth + layerStep;
      var nextArea = areaAtDepth(nextDepth);
      var layerArea = nextArea - prevArea;
      var lw = midWidth(prevDepth, nextDepth);
      passes.push({
        type: 'fill', name: 'Fill ' + (i + 1),
        area: layerArea,
        depthFrom: prevDepth, depthTo: nextDepth, methodKey: fillMethodKey,
        fillIndex: i,
        layerWidth: lw,
        passCount: passesInLayer(lw, fillMethodKey)
      });
      prevDepth = nextDepth;
      prevArea = nextArea;
    }

    // ===== Cap reinforcement (arc above OD line — outside bevel) =====
    // The cap is ONLY the reinforcement bead above the pipe surface.
    // Real WPS practice typically deposits the cap as 2-3 separate weld passes
    // (overlapping side-by-side) for quality control. We model this via passCount.
    var capPassCount = (t_mm >= 14) ? 3 : 2;
    passes.push({
      type: 'cap', name: 'Cap',
      area: capArea,
      depthFrom: t_mm, depthTo: t_mm + CAP_HEIGHT, methodKey: fillMethodKey,
      layerWidth: topWidth,
      passCount: capPassCount
    });

    var circumference = Math.PI * od_mm;
    for (var p = 0; p < passes.length; p++) {
      var pass = passes[p];
      var rawMass = pass.area * circumference * STEEL_DENSITY / 1e6;
      pass.mass_kg = rawMass / getEfficiency(pass.methodKey);
      pass.deposit_kg = rawMass;
    }

    return {
      passes: passes,
      totalGroove: totalGroove,
      capArea: capArea,
      topWidth: topWidth
    };
  }

  // Invert: find depth h such that areaAtDepth(h) == target_area, clamped to [0, t]
  function invertAreaAtDepth(target_area, r_mm, rootFace, tanHalf, t_mm) {
    if (target_area <= 0) return 0;
    var atRf = r_mm * rootFace;
    if (target_area <= atRf) {
      return target_area / r_mm;
    }
    // Above root face: r*rf + r*(h-rf) + (h-rf)^2 * tanHalf = target
    // Let x = h - rf, solve: tanHalf * x^2 + r * x + (r*rf - target) = 0
    var aboveTarget = target_area - atRf;
    // tanHalf * x^2 + r * x - aboveTarget = 0
    var a = tanHalf;
    var b = r_mm;
    var c = -aboveTarget;
    var disc = b * b - 4 * a * c;
    if (disc < 0) return t_mm;
    var x = (-b + Math.sqrt(disc)) / (2 * a);
    var h = rootFace + x;
    if (h > t_mm) h = t_mm;
    return h;
  }

  function drawBevel(t, r, f, a) {
    var cx = 180;
    var wallTop = 100;
    var wallBot = 180;
    var wallH_px = wallBot - wallTop;
    var pxPerMm = wallH_px / t;
    var halfAngleRad = (a / 2) * Math.PI / 180;
    var halfRoot = (r / 2) * pxPerMm;
    var rfH_px = f * pxPerMm;
    var rfTop = wallBot - rfH_px;
    var bevelHorz = (t - f) * Math.tan(halfAngleRad) * pxPerMm;
    var topLeftX = cx - halfRoot - bevelHorz;
    var topRightX = cx + halfRoot + bevelHorz;
    var farLeft = 30;
    var farRight = 330;

    // Draw pass layers BEFORE walls so walls overlay on top
    drawPassLayers(t, r, f, a, cx, wallTop, wallBot, pxPerMm, halfAngleRad, halfRoot, rfTop);

    setAttrs('left-wall', { d: 'M ' + farLeft + ' ' + wallTop + ' L ' + topLeftX + ' ' + wallTop + ' L ' + (cx - halfRoot) + ' ' + rfTop + ' L ' + (cx - halfRoot) + ' ' + wallBot + ' L ' + farLeft + ' ' + wallBot });
    setAttrs('right-wall', { d: 'M ' + farRight + ' ' + wallTop + ' L ' + topRightX + ' ' + wallTop + ' L ' + (cx + halfRoot) + ' ' + rfTop + ' L ' + (cx + halfRoot) + ' ' + wallBot + ' L ' + farRight + ' ' + wallBot });

    var tArrowX = farLeft + 35;
    setAttrs('t-line', { x1: tArrowX, y1: wallTop, x2: tArrowX, y2: wallBot });
    setAttrs('t-arrow-top', { points: tArrowX + ',' + wallTop + ' ' + (tArrowX - 4) + ',' + (wallTop + 6) + ' ' + (tArrowX + 4) + ',' + (wallTop + 6) });
    setAttrs('t-arrow-bot', { points: tArrowX + ',' + wallBot + ' ' + (tArrowX - 4) + ',' + (wallBot - 6) + ' ' + (tArrowX + 4) + ',' + (wallBot - 6) });
    setAttrs('t-label', { x: tArrowX + 10, y: (wallTop + wallBot) / 2 + 4 });

    var apexY = rfTop;
    var arcR = (rfTop - wallTop) + 25;
    var arcLX = cx - arcR * Math.sin(halfAngleRad);
    var arcLY = apexY - arcR * Math.cos(halfAngleRad);
    var arcRX = cx + arcR * Math.sin(halfAngleRad);
    var arcRY = apexY - arcR * Math.cos(halfAngleRad);
    setAttrs('alpha-arc', { d: 'M ' + arcLX + ' ' + arcLY + ' A ' + arcR + ' ' + arcR + ' 0 0 1 ' + arcRX + ' ' + arcRY });
    setAttrs('alpha-label', { x: cx, y: apexY - arcR - 6 });

    setAttrs('bevel-ext-l', { x1: topLeftX, y1: wallTop, x2: arcLX, y2: arcLY });
    setAttrs('bevel-ext-r', { x1: topRightX, y1: wallTop, x2: arcRX, y2: arcRY });

    var fExtX = cx + halfRoot + 25;
    setAttrs('f-ext-top', { x1: cx + halfRoot, y1: rfTop, x2: fExtX, y2: rfTop });
    setAttrs('f-ext-bot', { x1: cx + halfRoot, y1: wallBot, x2: fExtX, y2: wallBot });
    setAttrs('f-line', { x1: fExtX - 5, y1: rfTop, x2: fExtX - 5, y2: wallBot });
    setAttrs('f-arrow-top', { points: (fExtX - 5) + ',' + rfTop + ' ' + (fExtX - 9) + ',' + (rfTop + 6) + ' ' + (fExtX - 1) + ',' + (rfTop + 6) });
    setAttrs('f-arrow-bot', { points: (fExtX - 5) + ',' + wallBot + ' ' + (fExtX - 9) + ',' + (wallBot - 6) + ' ' + (fExtX - 1) + ',' + (wallBot - 6) });
    setAttrs('f-label', { x: fExtX + 4, y: (rfTop + wallBot) / 2 + 4 });

    var rDimY = wallBot + 28;
    var rExtL = cx - halfRoot;
    var rExtR = cx + halfRoot;
    setAttrs('r-ext-l', { x1: rExtL, y1: wallBot, x2: rExtL, y2: rDimY + 4 });
    setAttrs('r-ext-r', { x1: rExtR, y1: wallBot, x2: rExtR, y2: rDimY + 4 });
    setAttrs('r-line-l', { x1: rExtL - 25, y1: rDimY, x2: rExtL, y2: rDimY });
    setAttrs('r-line-r', { x1: rExtR + 25, y1: rDimY, x2: rExtR, y2: rDimY });
    setAttrs('r-arrow-l', { points: rExtL + ',' + rDimY + ' ' + (rExtL - 7) + ',' + (rDimY - 4) + ' ' + (rExtL - 7) + ',' + (rDimY + 4) });
    setAttrs('r-arrow-r', { points: rExtR + ',' + rDimY + ' ' + (rExtR + 7) + ',' + (rDimY - 4) + ' ' + (rExtR + 7) + ',' + (rDimY + 4) });
    setAttrs('r-label', { x: cx, y: rDimY + 22 });
  }

  // Draw colored pass layers inside the bevel (and cap above the pipe surface)
  function drawPassLayers(t, r, f, a, cx, wallTop, wallBot, pxPerMm, halfAngleRad, halfRoot, rfTop) {
    var layers = document.getElementById('pass-layers');
    if (!layers) return;
    while (layers.firstChild) layers.removeChild(layers.firstChild);

    var pipe = PIPE_DATA[npsSel.value];
    if (!pipe) return;
    var schedule = computePassSchedule(t, r, f, a, pipe.od_mm);

    // Convert depth (mm from inside) to Y coordinate. Inside is at wallBot (bottom of pipe view).
    function depthToY(depth_mm) {
      // depth 0 → wallBot, depth t → wallTop
      return wallBot - depth_mm * pxPerMm;
    }
    function widthAtDepth(depth_mm) {
      var rootFace = Math.min(f, t * 0.6);
      if (depth_mm <= rootFace) return r;
      return r + 2 * (depth_mm - rootFace) * Math.tan(halfAngleRad / 1); // halfAngleRad already half
    }
    function widthAtDepthPx(depth_mm) {
      return widthAtDepth(depth_mm) * pxPerMm;
    }

    var fillIdx = 0;

    // ===== VISUAL-ONLY depth remap =====
    // The calibrated Root+Hot area (30 mm²) occupies a large fraction of the bevel
    // groove on thin-wall pipe — geometrically correct but visually misleading.
    // We compress the Root+Hot vertical extent in the SVG only and re-expand the
    // Fill region so layers still chain seamlessly. Cap (above OD) is untouched.
    // Pass areas, masses and counts are NOT modified — this only affects depthFrom/
    // depthTo used for drawing the trapezoids.
    var ROOTHOT_VISUAL_SCALE = 0.65; // show Root+Hot at 65% of its true depth
    // Pass schedule uses depths in [0, t_mm] (root face is folded into widthAtDepth).
    // The remap must reach t_mm so the topmost Fill ends exactly at the OD line.
    var grooveDepth = t;
    // Find true Root+Hot top depth from schedule
    var rhTopDepth_true = 0;
    schedule.passes.forEach(function(p) {
      if (p.type === 'roothot' || p.type === 'hot' || p.type === 'root') {
        if (p.depthTo > rhTopDepth_true) rhTopDepth_true = p.depthTo;
      }
    });
    var rhTopDepth_visual = rhTopDepth_true * ROOTHOT_VISUAL_SCALE;
    function visualDepth(d) {
      if (rhTopDepth_true <= 0 || grooveDepth <= rhTopDepth_true) return d;
      if (d <= rhTopDepth_true) {
        return d * (rhTopDepth_visual / rhTopDepth_true);
      }
      var remainingTrue = grooveDepth - rhTopDepth_true;
      var remainingVisual = grooveDepth - rhTopDepth_visual;
      return rhTopDepth_visual + (d - rhTopDepth_true) * (remainingVisual / remainingTrue);
    }

    schedule.passes.forEach(function(pass, idx) {
      var color;
      if (pass.type === 'roothot') color = PASS_COLORS.roothot;
      else if (pass.type === 'root') color = PASS_COLORS.root;
      else if (pass.type === 'hot') color = PASS_COLORS.hot;
      else if (pass.type === 'cap') color = PASS_COLORS.cap;
      else {
        color = PASS_COLORS.fill[fillIdx % PASS_COLORS.fill.length];
        fillIdx++;
      }

      if (pass.type === 'cap') {
        // Cap is ONLY the reinforcement arc ABOVE the OD line.
        // Everything inside the bevel (below OD) is rendered as fill layers.
        var capH_px = CAP_HEIGHT * pxPerMm;
        var capBotY = wallTop;
        var capTopY = wallTop - capH_px;
        var bevelTopHalfWidth = halfRoot + (t - Math.min(f, t * 0.6)) * Math.tan(halfAngleRad) * pxPerMm;
        var capPath = 'M ' + (cx - bevelTopHalfWidth) + ' ' + capBotY +
                      ' Q ' + (cx - bevelTopHalfWidth * 0.5) + ' ' + capTopY + ' ' + cx + ' ' + capTopY +
                      ' Q ' + (cx + bevelTopHalfWidth * 0.5) + ' ' + capTopY + ' ' + (cx + bevelTopHalfWidth) + ' ' + capBotY + ' Z';
        var capEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        capEl.setAttribute('d', capPath);
        capEl.setAttribute('fill', color.fill);
        capEl.setAttribute('stroke', color.stroke);
        capEl.setAttribute('stroke-width', '0.8');
        layers.appendChild(capEl);
        // Cap pass dividers (vertical lines through the arc)
        if (pass.passCount && pass.passCount > 1) {
          for (var k = 1; k < pass.passCount; k++) {
            var frac = k / pass.passCount;
            var xPos = cx - bevelTopHalfWidth + frac * (2 * bevelTopHalfWidth);
            var t01 = (xPos - (cx - bevelTopHalfWidth)) / (2 * bevelTopHalfWidth);
            var capYAtX = capBotY - 4 * t01 * (1 - t01) * (capBotY - capTopY) * 0.95;
            var divEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            divEl.setAttribute('x1', xPos);
            divEl.setAttribute('y1', capBotY);
            divEl.setAttribute('x2', xPos);
            divEl.setAttribute('y2', capYAtX);
            divEl.setAttribute('stroke', color.stroke);
            divEl.setAttribute('stroke-width', '1.6');
            divEl.setAttribute('opacity', '1');
            layers.appendChild(divEl);
          }
        }
        addPassLabel(layers, cx, (capBotY + capTopY) / 2 + 3, 'cap', color.label);
        return;
      }

      // Bevel passes: trapezoid from depthFrom to depthTo
      // Use visualDepth() so Root+Hot appears smaller and Fill larger,
      // without changing the underlying area/mass calculation.
      // Both Y (vertical extent) and X (width) use the visual depth so the
      // trapezoid edges remain flush with the drawn bevel walls.
      var dFromVis = visualDepth(pass.depthFrom);
      var dToVis   = visualDepth(pass.depthTo);
      var yBot = depthToY(dFromVis);
      var yTop = depthToY(dToVis);
      var halfBotPx = widthAtDepthPx(dFromVis) / 2;
      var halfTopPx = widthAtDepthPx(dToVis) / 2;
      var pathD = 'M ' + (cx - halfBotPx) + ' ' + yBot +
                  ' L ' + (cx + halfBotPx) + ' ' + yBot +
                  ' L ' + (cx + halfTopPx) + ' ' + yTop +
                  ' L ' + (cx - halfTopPx) + ' ' + yTop + ' Z';
      var el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      el.setAttribute('d', pathD);
      el.setAttribute('fill', color.fill);
      el.setAttribute('stroke', color.stroke);
      el.setAttribute('stroke-width', '1.4');
      layers.appendChild(el);

      // (Note: Hussain's reference model does not include a separate root reinforcement
      // bulge below the ID line. The 30 mm² root area is fully contained within the
      // bevel cavity, occupying ~5.6mm of depth.)

      // Draw pass dividers within this layer (vertical lines)
      // Each layer is composed of `passCount` passes side-by-side
      if (pass.passCount && pass.passCount > 1) {
        for (var k = 1; k < pass.passCount; k++) {
          var frac = k / pass.passCount;
          // Divider line goes from the layer's bottom edge to its top edge,
          // following the slope of the trapezoid sides
          var dxBot = (frac - 0.5) * 2 * halfBotPx;
          var dxTop = (frac - 0.5) * 2 * halfTopPx;
          var dividerEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          dividerEl.setAttribute('x1', cx + dxBot);
          dividerEl.setAttribute('y1', yBot);
          dividerEl.setAttribute('x2', cx + dxTop);
          dividerEl.setAttribute('y2', yTop);
          dividerEl.setAttribute('stroke', color.stroke);
          dividerEl.setAttribute('stroke-width', '1.6');
          dividerEl.setAttribute('opacity', '1');
          layers.appendChild(dividerEl);
        }
      }

      // Add label if layer is tall enough — show "name × passCount" if multiple
      var passHeight = yBot - yTop;
      if (passHeight >= 8) {
        var labelText;
        if (pass.type === 'roothot') labelText = 'R+H';
        else if (pass.type === 'root') labelText = 'R';
        else if (pass.type === 'hot') labelText = 'H';
        else labelText = String(pass.fillIndex + 1);
        addPassLabel(layers, cx, (yBot + yTop) / 2 + 3, labelText, color.label);
      }
    });

    // Update breakdown panel
    updatePassBreakdown(schedule);
  }

  function addPassLabel(parent, x, y, text, color) {
    var t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', x);
    t.setAttribute('y', y);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-size', '8');
    t.setAttribute('font-weight', '600');
    t.setAttribute('fill', color);
    t.setAttribute('font-family', 'sans-serif');
    t.textContent = text;
    parent.appendChild(t);
  }

  function updatePassBreakdown(schedule) {
    var box = document.getElementById('pass-breakdown');
    if (!box) return;
    // Group by type for display
    var rootHotPass = schedule.passes.find(function(p) { return p.type === 'roothot'; });
    var rootPass = schedule.passes.find(function(p) { return p.type === 'root'; });
    var hotPass = schedule.passes.find(function(p) { return p.type === 'hot'; });
    var fillPasses = schedule.passes.filter(function(p) { return p.type === 'fill'; });
    var capPass = schedule.passes.find(function(p) { return p.type === 'cap'; });

    var fillTotalMass = fillPasses.reduce(function(s, p) { return s + p.mass_kg; }, 0);
    var fillTotalArea = fillPasses.reduce(function(s, p) { return s + p.area; }, 0);
    var fillTotalPasses = fillPasses.reduce(function(s, p) { return s + (p.passCount || 1); }, 0);

    var html = '';
    function row(swatch, name, layerCount, passCount, methodKey, area, mass, methodNote) {
      var passText = '';
      if (passCount && passCount > 1) {
        passText = ' · ' + passCount + (passCount > 1 ? ' passes' : ' pass');
      }
      var methodLine = methodKey + (methodNote ? ' ' + methodNote : '') + ' · ' + area.toFixed(1) + ' mm²' + passText;
      return '<div class="pass-row">' +
        '<div class="pass-swatch" style="background:' + swatch + ';"></div>' +
        '<div class="pass-info">' +
          '<div class="pass-name">' + name + '</div>' +
          '<div class="pass-desc">' + methodLine + '</div>' +
        '</div>' +
        '<div class="pass-mass">' + mass.toFixed(2) + ' kg</div>' +
      '</div>';
    }

    var totalActualPasses = 0;
    if (rootHotPass) {
      html += row(PASS_COLORS.roothot.fill, 'Root + Hot', 1, rootHotPass.passCount || 1, rootHotPass.methodKey, rootHotPass.area, rootHotPass.mass_kg, '(STT)');
      totalActualPasses += rootHotPass.passCount || 1;
    } else {
      if (rootPass) {
        html += row(PASS_COLORS.root.fill, 'Root', 1, rootPass.passCount || 1, rootPass.methodKey, rootPass.area, rootPass.mass_kg);
        totalActualPasses += rootPass.passCount || 1;
      }
      if (hotPass) {
        html += row(PASS_COLORS.hot.fill, 'Hot', 1, hotPass.passCount || 1, hotPass.methodKey, hotPass.area, hotPass.mass_kg);
        totalActualPasses += hotPass.passCount || 1;
      }
    }
    if (fillPasses.length) {
      html += row(PASS_COLORS.fill[0].fill, 'Fill', fillPasses.length, fillTotalPasses, fillPasses[0].methodKey, fillTotalArea, fillTotalMass);
      totalActualPasses += fillTotalPasses;
    }
    if (capPass) {
      html += row(PASS_COLORS.cap.fill, 'Cap', 1, capPass.passCount || 1, capPass.methodKey, capPass.area, capPass.mass_kg);
      totalActualPasses += capPass.passCount || 1;
    }

    box.innerHTML = html;
  }

  npsSel.addEventListener('change', function() {
    populateSchedules();
    wtDisplayEl.style.display = 'block';
    wtInput.style.display = 'none';
    wtHint.textContent = '';
    wtInput.value = '';
    calc();
  });
  schSel.addEventListener('change', handleScheduleChange);
  wtInput.addEventListener('input', calc);
  var sliders = [ro, rf, ang, len, repairSlider];
  for (var s = 0; s < sliders.length; s++) {
    sliders[s].addEventListener('input', calc);
  }

  // MTO tab — declare variables BEFORE calc() so updateMTOTotals can access mtoRows safely
  var mtoRows = [];
  var mtoTbody = document.getElementById('mto-tbody');
  var mtoJoints = document.getElementById('mto-joints');
  var mtoCombined = document.getElementById('mto-combined');

  populateSchedules();
  calc();

  function recalcRow(rd) {
    var pipe = PIPE_DATA[rd.npsIdx];
    var t;
    if (rd.sch === 'CUSTOM') {
      t = parseFloat(rd.customWt) || pipe.schedules['STD'] || 9.52;
    } else {
      t = pipe.schedules[rd.sch];
    }
    if (!t) return;
    // Compute per-joint masses using row-specific methods (not global ones)
    // We pass the methods through a temporary swap of the global rootMethod/fillMethod
    var savedRoot = rootMethod, savedFill = fillMethod;
    rootMethod = { method: rd.rootMethod };
    fillMethod = { method: rd.fillMethod };
    var per = calculatePerJoint(pipe.od_mm, t, parseFloat(ro.value), parseFloat(rf.value), parseFloat(ang.value));
    rootMethod = savedRoot;
    fillMethod = savedFill;

    var joints = Math.round(rd.length / PIPE_LENGTH);
    var repair = parseFloat(repairSlider.value);
    var totalFactor = WASTE * (1 + repair / 100);
    rd._joints = joints;
    rd._rootMass = per.gmaw * joints * totalFactor;
    rd._fillMass = per.fcaw * joints * totalFactor;
    rd._t = t;
    rd._od = pipe.od_mm;
  }

  function refreshRowDisplay(rd) {
    var tr = document.getElementById(rd.id);
    if (!tr) return;
    tr.querySelector('.mto-joints').textContent = rd._joints.toLocaleString();
    tr.querySelector('.mto-root-mass').textContent = Math.round(rd._rootMass).toLocaleString() + ' kg';
    tr.querySelector('.mto-fill-mass').textContent = Math.round(rd._fillMass).toLocaleString() + ' kg';
  }

  function addMTORow(npsIdx, schValue, customWt, length, rootMethodKey, fillMethodKey) {
    var rowId = 'mto-row-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    var rowData = {
      id: rowId,
      npsIdx: (npsIdx !== undefined && npsIdx !== null) ? npsIdx : 21,
      sch: schValue || 'STD',
      customWt: customWt || '',
      length: length || 1000,
      rootMethod: rootMethodKey || rootMethod.method,
      fillMethod: fillMethodKey || fillMethod.method
    };
    mtoRows.push(rowData);

    var tr = document.createElement('tr');
    tr.id = rowId;
    tr.innerHTML =
      '<td><select class="mto-nps"></select></td>' +
      '<td><select class="mto-sch"></select></td>' +
      '<td><input type="number" class="mto-len" min="0" step="1" /></td>' +
      '<td><select class="mto-root-method"></select></td>' +
      '<td><select class="mto-fill-method"></select></td>' +
      '<td class="col-result mto-joints">\u2014</td>' +
      '<td class="col-result mto-root-mass">\u2014</td>' +
      '<td class="col-result mto-fill-mass">\u2014</td>' +
      '<td class="col-action"><button class="remove-row" title="Remove">\u00D7</button></td>';
    mtoTbody.appendChild(tr);

    var npsSelEl = tr.querySelector('.mto-nps');
    var schSelEl = tr.querySelector('.mto-sch');
    var lenEl = tr.querySelector('.mto-len');
    var rootMethSel = tr.querySelector('.mto-root-method');
    var fillMethSel = tr.querySelector('.mto-fill-method');

    // Populate method dropdowns (use short names for compactness)
    Object.keys(METHODS).forEach(function(key) {
      var oR = document.createElement('option');
      oR.value = key;
      oR.textContent = key;
      rootMethSel.appendChild(oR);
      var oF = document.createElement('option');
      oF.value = key;
      oF.textContent = key;
      fillMethSel.appendChild(oF);
    });
    rootMethSel.value = rowData.rootMethod;
    fillMethSel.value = rowData.fillMethod;

    for (var ii = 0; ii < PIPE_DATA.length; ii++) {
      var pp = PIPE_DATA[ii];
      var oo = document.createElement('option');
      oo.value = ii;
      var lbl = pp.nps < 1 ? pp.nps : (pp.nps % 1 === 0 ? pp.nps.toFixed(0) : pp.nps);
      oo.textContent = lbl + '"';
      npsSelEl.appendChild(oo);
    }
    npsSelEl.value = rowData.npsIdx;

    function populateRowSchedules() {
      var pipe = PIPE_DATA[parseInt(npsSelEl.value)];
      schSelEl.innerHTML = '';
      for (var kk = 0; kk < SCH_ORDER.length; kk++) {
        var sn = SCH_ORDER[kk];
        if (pipe.schedules[sn] !== undefined) {
          var oo = document.createElement('option');
          oo.value = sn;
          oo.textContent = sn + ' (' + pipe.schedules[sn] + ' mm)';
          schSelEl.appendChild(oo);
        }
      }
      var co = document.createElement('option');
      co.value = 'CUSTOM';
      co.textContent = rowData.customWt ? ('Custom (' + rowData.customWt + ' mm)') : 'Custom\u2026';
      schSelEl.appendChild(co);
      if (pipe.schedules['STD'] !== undefined) schSelEl.value = 'STD';
      if (rowData.sch === 'CUSTOM' || pipe.schedules[rowData.sch] !== undefined) {
        schSelEl.value = rowData.sch;
      }
    }
    populateRowSchedules();
    lenEl.value = rowData.length;

    function onRowChange() {
      rowData.npsIdx = parseInt(npsSelEl.value);
      var newSch = schSelEl.value;
      rowData.length = parseFloat(lenEl.value) || 0;
      rowData.rootMethod = rootMethSel.value;
      rowData.fillMethod = fillMethSel.value;

      if (newSch === 'CUSTOM' && rowData.sch !== 'CUSTOM') {
        var customStr = prompt('Enter custom wall thickness (mm):', rowData.customWt || '9.52');
        if (customStr === null) {
          schSelEl.value = rowData.sch !== 'CUSTOM' ? rowData.sch : 'STD';
          return;
        }
        var customVal = parseFloat(customStr);
        if (isNaN(customVal) || customVal <= 0) {
          schSelEl.value = rowData.sch !== 'CUSTOM' ? rowData.sch : 'STD';
          return;
        }
        rowData.customWt = customVal;
        rowData.sch = 'CUSTOM';
        for (var optI = 0; optI < schSelEl.options.length; optI++) {
          if (schSelEl.options[optI].value === 'CUSTOM') {
            schSelEl.options[optI].textContent = 'Custom (' + customVal + ' mm)';
            break;
          }
        }
      } else {
        rowData.sch = newSch;
      }

      recalcRow(rowData);
      refreshRowDisplay(rowData);
      updateMTOTotals();
    }

    npsSelEl.addEventListener('change', function() {
      populateRowSchedules();
      onRowChange();
    });
    schSelEl.addEventListener('change', onRowChange);
    lenEl.addEventListener('input', onRowChange);
    rootMethSel.addEventListener('change', onRowChange);
    fillMethSel.addEventListener('change', onRowChange);
    tr.querySelector('.remove-row').addEventListener('click', function() {
      tr.remove();
      var idx = -1;
      for (var rr = 0; rr < mtoRows.length; rr++) {
        if (mtoRows[rr].id === rowId) { idx = rr; break; }
      }
      if (idx >= 0) mtoRows.splice(idx, 1);
      updateMTOTotals();
    });

    recalcRow(rowData);
    refreshRowDisplay(rowData);
    updateMTOTotals();
  }

  function updateMTOTotals() {
    var totalJoints = 0;
    // Aggregate per method, separated by role (root vs fill)
    // Key: methodKey, value: {rootMass, fillMass}
    var perMethod = {};
    function ensureKey(k) { if (!perMethod[k]) perMethod[k] = { root: 0, fill: 0 }; }
    for (var i = 0; i < mtoRows.length; i++) {
      recalcRow(mtoRows[i]);
      refreshRowDisplay(mtoRows[i]);
      var rd = mtoRows[i];
      totalJoints += rd._joints || 0;
      ensureKey(rd.rootMethod); perMethod[rd.rootMethod].root += rd._rootMass || 0;
      ensureKey(rd.fillMethod); perMethod[rd.fillMethod].fill += rd._fillMass || 0;
    }
    var combined = 0;
    Object.keys(perMethod).forEach(function(k) {
      combined += perMethod[k].root + perMethod[k].fill;
    });

    mtoJoints.textContent = totalJoints.toLocaleString();
    mtoCombined.textContent = Math.round(combined).toLocaleString() + ' kg';

    // Build method totals UI
    var box = document.getElementById('mto-method-totals');
    if (!box) return;
    if (mtoRows.length === 0) {
      box.innerHTML = '<div class="mto-method-empty">No items added yet. Click "+ Add row" to start.</div>';
      return;
    }
    var html = '';
    Object.keys(perMethod).sort().forEach(function(k) {
      var m = perMethod[k];
      var roleLines = [];
      if (m.root > 0) roleLines.push('Root + Hot: ' + Math.round(m.root).toLocaleString() + ' kg');
      if (m.fill > 0) roleLines.push('Fill + Cap: ' + Math.round(m.fill).toLocaleString() + ' kg');
      var total = m.root + m.fill;
      html += '<div class="mto-method-card">' +
        '<div class="method-label">' + k + '</div>' +
        '<div class="method-role">' + roleLines.join(' &middot; ') + '</div>' +
        '<div class="method-value">' + Math.round(total).toLocaleString() + ' kg</div>' +
      '</div>';
    });
    box.innerHTML = html;
  }

  document.getElementById('btn-add-row').addEventListener('click', function() { addMTORow(); });
  document.getElementById('btn-clear-mto').addEventListener('click', function() {
    if (mtoRows.length === 0) return;
    if (confirm('Clear all MTO rows?')) {
      mtoRows = [];
      mtoTbody.innerHTML = '';
      updateMTOTotals();
    }
  });

  // Seed default project rows (sample MTO)
  addMTORow(21, 'STD', null, 29600);          // 20" STD 9.52 mm
  addMTORow(21, 'CUSTOM', 11.13, 3550);       // 20" Custom 11.13 mm
  addMTORow(21, 'CUSTOM', 11.91, 2100);       // 20" Custom 11.91 mm
  addMTORow(17, '40', null, 2850);            // 12" SCH 40 (10.31 mm)
  addMTORow(16, 'STD', null, 14700);          // 10" STD 9.27 mm
  addMTORow(15, 'STD', null, 8750);           // 8" STD 8.18 mm

  // XLSX export using SheetJS — produces real Excel files with formatting
  function exportXLSX(filename, sheetName, sections) {
    if (typeof XLSX === 'undefined') {
      alert('Excel library failed to load. Please check your internet connection and try again.');
      return;
    }
    var wb = XLSX.utils.book_new();
    var aoa = []; // array of arrays for the whole sheet
    var merges = [];
    var headerRows = []; // rows that should be styled as headers
    var titleRows = []; // rows that should be styled as titles
    var totalRows = []; // rows that should be styled as totals

    sections.forEach(function(section) {
      if (section.type === 'title') {
        titleRows.push(aoa.length);
        aoa.push([section.text]);
        merges.push({ s: { r: aoa.length - 1, c: 0 }, e: { r: aoa.length - 1, c: section.cols - 1 } });
        aoa.push([]); // blank row after title
      } else if (section.type === 'header') {
        headerRows.push(aoa.length);
        aoa.push(section.row);
      } else if (section.type === 'data') {
        section.rows.forEach(function(row) {
          aoa.push(row);
        });
      } else if (section.type === 'total') {
        totalRows.push(aoa.length);
        aoa.push(section.row);
      } else if (section.type === 'blank') {
        aoa.push([]);
      } else if (section.type === 'subheader') {
        titleRows.push(aoa.length);
        aoa.push([section.text]);
        merges.push({ s: { r: aoa.length - 1, c: 0 }, e: { r: aoa.length - 1, c: section.cols - 1 } });
      }
    });

    var ws = XLSX.utils.aoa_to_sheet(aoa);

    // Apply merges
    if (merges.length > 0) ws['!merges'] = merges;

    // Apply column widths
    var maxCols = Math.max.apply(null, aoa.map(function(r) { return r.length; }));
    var colWidths = [];
    for (var c = 0; c < maxCols; c++) {
      var maxLen = 10;
      for (var r = 0; r < aoa.length; r++) {
        if (aoa[r][c] != null) {
          var len = String(aoa[r][c]).length;
          if (len > maxLen) maxLen = len;
        }
      }
      colWidths.push({ wch: Math.min(maxLen + 2, 50) });
    }
    ws['!cols'] = colWidths;

    // Style cells (SheetJS Community Edition supports basic cell properties via cell objects)
    // We'll apply styles via cell.s on each cell
    var TITLE_STYLE = {
      font: { bold: true, sz: 14, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '185FA5' }, patternType: 'solid' },
      alignment: { horizontal: 'left', vertical: 'center' }
    };
    var HEADER_STYLE = {
      font: { bold: true, color: { rgb: '2C2C2A' } },
      fill: { fgColor: { rgb: 'F1EFE8' }, patternType: 'solid' },
      alignment: { horizontal: 'left', vertical: 'center' },
      border: {
        bottom: { style: 'thin', color: { rgb: '888780' } }
      }
    };
    var TOTAL_STYLE = {
      font: { bold: true, color: { rgb: '185FA5' } },
      fill: { fgColor: { rgb: 'F1EFE8' }, patternType: 'solid' },
      border: {
        top: { style: 'medium', color: { rgb: '185FA5' } }
      }
    };

    function applyStyleToRow(rowIdx, style) {
      for (var c = 0; c < maxCols; c++) {
        var addr = XLSX.utils.encode_cell({ r: rowIdx, c: c });
        if (!ws[addr]) ws[addr] = { t: 's', v: '' };
        ws[addr].s = style;
      }
    }

    titleRows.forEach(function(r) { applyStyleToRow(r, TITLE_STYLE); });
    headerRows.forEach(function(r) { applyStyleToRow(r, HEADER_STYLE); });
    totalRows.forEach(function(r) { applyStyleToRow(r, TOTAL_STYLE); });

    // Set row heights for title rows
    ws['!rows'] = [];
    titleRows.forEach(function(r) {
      ws['!rows'][r] = { hpx: 28 };
    });

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, filename);
  }

  document.getElementById('btn-export-single').addEventListener('click', function() {
    try {
      var pipe = PIPE_DATA[parseInt(npsSel.value)];
      var t = getCurrentThickness();
      var r = parseFloat(ro.value);
      var f = parseFloat(rf.value);
      var a = parseFloat(ang.value);
      var l = parseFloat(len.value);
      var repair = parseFloat(repairSlider.value);
      var per = calculatePerJoint(pipe.od_mm, t, r, f, a);
      var joints = Math.round(l / PIPE_LENGTH);
      var totalFactor = WASTE * (1 + repair / 100);

      var sections = [
        { type: 'title', text: 'OPCO — Welding Consumables Calculator', cols: 3 },
        { type: 'subheader', text: 'Input parameters', cols: 3 },
        { type: 'header', row: ['Parameter', 'Value', 'Unit'] },
        { type: 'data', rows: [
          ['Pipe size (NPS)', pipe.nps + '"', ''],
          ['Outside diameter (D)', pipe.od_mm, 'mm'],
          ['Wall thickness (T)', t, 'mm'],
          ['Schedule', schSel.value === 'CUSTOM' ? 'Custom' : 'SCH ' + schSel.value, ''],
          ['Root opening (R)', r, 'mm'],
          ['Root face (F)', f, 'mm'],
          ['Bevel angle (α)', a, '°'],
          ['Cap reinforcement height', CAP_HEIGHT, 'mm'],
          ['Pipeline length', l, 'm'],
          ['Repair allowance', repair, '%'],
          ['Waste factor', 10, '%']
        ]},
        { type: 'blank' },
        { type: 'subheader', text: 'Welding methods', cols: 3 },
        { type: 'header', row: ['Pass', 'Method', ''] },
        { type: 'data', rows: [
          ['Root + Hot pass', rootMethod.method, ''],
          ['Fill + Cap pass', fillMethod.method, ''],
          ['Root/Hot efficiency', (getEfficiency(rootMethod.method) * 100).toFixed(0) + '%', ''],
          ['Fill/Cap efficiency', (getEfficiency(fillMethod.method) * 100).toFixed(0) + '%', '']
        ]},
        { type: 'blank' },
        { type: 'subheader', text: 'Results', cols: 3 },
        { type: 'header', row: ['Metric', 'Value', 'Unit'] },
        { type: 'data', rows: [
          ['Joints (12 m pipe)', joints, ''],
          [rootMethod.method + ' per joint (incl. waste + repair)', Number((per.gmaw * totalFactor).toFixed(3)), 'kg'],
          [fillMethod.method + ' per joint (incl. waste + repair)', Number((per.fcaw * totalFactor).toFixed(3)), 'kg'],
          [rootMethod.method + ' total', Math.round(per.gmaw * joints * totalFactor), 'kg'],
          [fillMethod.method + ' total', Math.round(per.fcaw * joints * totalFactor), 'kg']
        ]},
        { type: 'total', row: ['Combined total', Math.round((per.gmaw + per.fcaw) * joints * totalFactor), 'kg'] }
      ];

      var stamp = new Date().toISOString().slice(0, 10);
      exportXLSX('welding-consumption-' + stamp + '.xlsx', 'Single Pipe', sections);
    } catch (e) {
      alert('Export error: ' + e.message);
      console.error(e);
    }
  });

  document.getElementById('btn-export-mto').addEventListener('click', function() {
    try {
      if (mtoRows.length === 0) {
        alert('Add at least one row before exporting.');
        return;
      }
      updateMTOTotals();

      var dataRows = [];
      var totalJoints = 0, totalGmaw = 0, totalFcaw = 0;
      for (var i = 0; i < mtoRows.length; i++) {
        var rd = mtoRows[i];
        var pipe = PIPE_DATA[rd.npsIdx];
        var npsLbl = pipe.nps < 1 ? pipe.nps : (pipe.nps % 1 === 0 ? pipe.nps.toFixed(0) : pipe.nps);
        dataRows.push([
          i + 1, npsLbl + '"', pipe.od_mm, rd._t, rd.length,
          rd._joints, Math.round(rd._gmaw), Math.round(rd._fcaw),
          Math.round(rd._gmaw + rd._fcaw)
        ]);
        totalJoints += rd._joints;
        totalGmaw += rd._gmaw;
        totalFcaw += rd._fcaw;
      }

      var sections = [
        { type: 'title', text: 'OPCO — Welding Consumables Calculator — Project MTO', cols: 9 },
        { type: 'subheader', text: 'Pipe items', cols: 9 },
        { type: 'header', row: ['#', 'NPS', 'OD (mm)', 'Wall (mm)', 'Length (m)', 'Joints', rootMethod.method + ' (kg)', fillMethod.method + ' (kg)', 'Combined (kg)'] },
        { type: 'data', rows: dataRows },
        { type: 'total', row: ['', 'TOTAL', '', '', '', totalJoints, Math.round(totalGmaw), Math.round(totalFcaw), Math.round(totalGmaw + totalFcaw)] },
        { type: 'blank' },
        { type: 'subheader', text: 'Bevel parameters (applied to all items)', cols: 9 },
        { type: 'header', row: ['Parameter', 'Value', 'Unit'] },
        { type: 'data', rows: [
          ['Root opening (R)', parseFloat(ro.value), 'mm'],
          ['Root face (F)', parseFloat(rf.value), 'mm'],
          ['Bevel angle (α)', parseFloat(ang.value), '°'],
          ['Cap reinforcement height', CAP_HEIGHT, 'mm'],
          ['Repair allowance', parseFloat(repairSlider.value), '%'],
          ['Waste factor', 10, '%']
        ]}
      ];

      var stamp = new Date().toISOString().slice(0, 10);
      exportXLSX('welding-mto-' + stamp + '.xlsx', 'Project MTO', sections);
    } catch (e) {
      alert('Export error: ' + e.message);
      console.error(e);
    }
  });

  // Print
  document.getElementById('btn-print-single').addEventListener('click', function() {
    try {
      // 'single' / 'mto' / 'schtable' are SUBTABS of Consumable, not top-level tabs.
      var st = document.querySelector('.subtab[data-subtab="single"]');
      if (st) st.click();
      setTimeout(function() { window.print(); }, 100);
    } catch (e) { alert('Print error: ' + e.message); }
  });
  document.getElementById('btn-print-mto').addEventListener('click', function() {
    try {
      var st = document.querySelector('.subtab[data-subtab="mto"]');
      if (st) st.click();
      setTimeout(function() { window.print(); }, 100);
    } catch (e) { alert('Print error: ' + e.message); }
  });

  // ===== Projects tab =====
  // Per-project joint history embedded as JSON snapshot. Updated when user
  // sends a fresh export from their tracking spreadsheet. Welder identities
  // come from PIPING_WELDERS (single source of truth for stamps/names/photos);
  // joint history just supplies the activity stats keyed by stamp.
  var PROJECT_HTU = {"project": "HTU", "project_name": "HTU â€” piping works", "data_date": "2026-05-23", "totals": {"total_joints": 8617, "completed_joints": 6987, "total_wdi": 16983.5, "completed_wdi": 14770.5, "total_tested": 1208, "total_repair": 53, "total_lines": 285, "project_repair_rate": 4.4}, "welders": [{"stamp": " ", "joints": 1, "dia_inch": 4.0, "tested": 0, "acc": 0, "rej": 0, "pending": 0, "repair_rate": null, "last_weld": "2025-08-20", "last_rt": null}, {"stamp": "W-01", "joints": 1127, "dia_inch": 2522.75, "tested": 244, "acc": 237, "rej": 7, "pending": 0, "repair_rate": 2.9, "last_weld": "2026-01-11", "last_rt": "2026-04-28"}, {"stamp": "W-02", "joints": 1913, "dia_inch": 3929.75, "tested": 351, "acc": 345, "rej": 6, "pending": 1, "repair_rate": 1.7, "last_weld": "2026-04-29", "last_rt": "2026-05-20"}, {"stamp": "W-04", "joints": 20, "dia_inch": 36.5, "tested": 6, "acc": 3, "rej": 3, "pending": 0, "repair_rate": 50.0, "last_weld": "2026-02-28", "last_rt": "2026-03-09"}, {"stamp": "W-05", "joints": 461, "dia_inch": 725.75, "tested": 39, "acc": 30, "rej": 9, "pending": 1, "repair_rate": 23.1, "last_weld": "2026-05-20", "last_rt": "2026-04-28"}, {"stamp": "W-06", "joints": 1323, "dia_inch": 3349.25, "tested": 216, "acc": 210, "rej": 6, "pending": 1, "repair_rate": 2.8, "last_weld": "2026-05-23", "last_rt": "2026-05-21"}, {"stamp": "W-07", "joints": 842, "dia_inch": 1857.75, "tested": 187, "acc": 185, "rej": 2, "pending": 3, "repair_rate": 1.1, "last_weld": "2026-05-23", "last_rt": "2026-05-21"}, {"stamp": "W-08", "joints": 345, "dia_inch": 879.25, "tested": 64, "acc": 59, "rej": 5, "pending": 0, "repair_rate": 7.8, "last_weld": "2026-05-06", "last_rt": "2026-05-09"}, {"stamp": "W-09", "joints": 650, "dia_inch": 908.5, "tested": 63, "acc": 53, "rej": 10, "pending": 1, "repair_rate": 15.9, "last_weld": "2026-05-04", "last_rt": "2026-05-21"}, {"stamp": "W-10", "joints": 79, "dia_inch": 91.5, "tested": 24, "acc": 19, "rej": 5, "pending": 0, "repair_rate": 20.8, "last_weld": "2026-03-03", "last_rt": "2026-05-09"}, {"stamp": "W-11", "joints": 121, "dia_inch": 306.5, "tested": 1, "acc": 1, "rej": 0, "pending": 0, "repair_rate": 0.0, "last_weld": "2026-05-23", "last_rt": "2026-05-16"}, {"stamp": "W-21", "joints": 104, "dia_inch": 147.0, "tested": 13, "acc": 13, "rej": 0, "pending": 0, "repair_rate": 0.0, "last_weld": "2026-05-23", "last_rt": "2026-05-20"}, {"stamp": "W-06/W-07", "joints": 1, "dia_inch": 12.0, "tested": 0, "acc": 0, "rej": 0, "pending": 0, "repair_rate": null, "last_weld": "2025-10-12", "last_rt": null}], "daily_throughput": [{"date": "2025-06-22", "joints": 23, "wdi": 69.0}, {"date": "2025-06-23", "joints": 24, "wdi": 74.0}, {"date": "2025-06-24", "joints": 17, "wdi": 79.0}, {"date": "2025-07-14", "joints": 4, "wdi": 24.0}, {"date": "2025-07-15", "joints": 4, "wdi": 48.0}, {"date": "2025-07-16", "joints": 4, "wdi": 36.0}, {"date": "2025-07-17", "joints": 4, "wdi": 48.0}, {"date": "2025-07-19", "joints": 6, "wdi": 48.0}, {"date": "2025-07-20", "joints": 6, "wdi": 38.0}, {"date": "2025-07-21", "joints": 6, "wdi": 46.0}, {"date": "2025-07-22", "joints": 5, "wdi": 40.0}, {"date": "2025-07-23", "joints": 6, "wdi": 48.0}, {"date": "2025-07-24", "joints": 6, "wdi": 48.0}, {"date": "2025-07-26", "joints": 1, "wdi": 8.0}, {"date": "2025-07-27", "joints": 1, "wdi": 6.0}, {"date": "2025-07-28", "joints": 2, "wdi": 12.0}, {"date": "2025-07-29", "joints": 5, "wdi": 30.0}, {"date": "2025-07-30", "joints": 6, "wdi": 36.0}, {"date": "2025-07-31", "joints": 5, "wdi": 30.0}, {"date": "2025-08-02", "joints": 6, "wdi": 36.0}, {"date": "2025-08-03", "joints": 9, "wdi": 48.0}, {"date": "2025-08-04", "joints": 15, "wdi": 48.0}, {"date": "2025-08-05", "joints": 13, "wdi": 39.0}, {"date": "2025-08-06", "joints": 17, "wdi": 51.0}, {"date": "2025-08-07", "joints": 14, "wdi": 42.0}, {"date": "2025-08-09", "joints": 8, "wdi": 73.5}, {"date": "2025-08-10", "joints": 6, "wdi": 38.0}, {"date": "2025-08-11", "joints": 9, "wdi": 54.75}, {"date": "2025-08-12", "joints": 10, "wdi": 35.0}, {"date": "2025-08-13", "joints": 13, "wdi": 69.5}, {"date": "2025-08-14", "joints": 21, "wdi": 84.5}, {"date": "2025-08-16", "joints": 26, "wdi": 86.5}, {"date": "2025-08-17", "joints": 43, "wdi": 74.25}, {"date": "2025-08-18", "joints": 40, "wdi": 52.5}, {"date": "2025-08-19", "joints": 35, "wdi": 63.0}, {"date": "2025-08-20", "joints": 38, "wdi": 75.75}, {"date": "2025-08-21", "joints": 32, "wdi": 56.75}, {"date": "2025-08-23", "joints": 40, "wdi": 62.0}, {"date": "2025-08-24", "joints": 32, "wdi": 61.0}, {"date": "2025-08-25", "joints": 20, "wdi": 28.75}, {"date": "2025-08-31", "joints": 21, "wdi": 29.5}, {"date": "2025-09-02", "joints": 12, "wdi": 14.75}, {"date": "2025-09-03", "joints": 44, "wdi": 81.75}, {"date": "2025-09-04", "joints": 57, "wdi": 92.75}, {"date": "2025-09-06", "joints": 67, "wdi": 113.5}, {"date": "2025-09-07", "joints": 81, "wdi": 132.5}, {"date": "2025-09-08", "joints": 32, "wdi": 56.5}, {"date": "2025-09-09", "joints": 6, "wdi": 13.5}, {"date": "2025-09-10", "joints": 43, "wdi": 59.0}, {"date": "2025-09-11", "joints": 77, "wdi": 94.75}, {"date": "2025-09-13", "joints": 81, "wdi": 133.75}, {"date": "2025-09-14", "joints": 102, "wdi": 150.5}, {"date": "2025-09-15", "joints": 72, "wdi": 105.25}, {"date": "2025-09-16", "joints": 53, "wdi": 68.0}, {"date": "2025-09-18", "joints": 61, "wdi": 62.25}, {"date": "2025-09-20", "joints": 59, "wdi": 70.0}, {"date": "2025-09-21", "joints": 22, "wdi": 45.0}, {"date": "2025-09-22", "joints": 4, "wdi": 22.0}, {"date": "2025-09-23", "joints": 10, "wdi": 33.25}, {"date": "2025-09-25", "joints": 28, "wdi": 32.0}, {"date": "2025-09-27", "joints": 10, "wdi": 29.0}, {"date": "2025-09-28", "joints": 33, "wdi": 59.5}, {"date": "2025-09-29", "joints": 21, "wdi": 55.25}, {"date": "2025-09-30", "joints": 36, "wdi": 50.75}, {"date": "2025-10-01", "joints": 23, "wdi": 51.0}, {"date": "2025-10-02", "joints": 18, "wdi": 42.25}, {"date": "2025-10-04", "joints": 12, "wdi": 18.0}, {"date": "2025-10-05", "joints": 14, "wdi": 18.25}, {"date": "2025-10-06", "joints": 7, "wdi": 9.75}, {"date": "2025-10-07", "joints": 11, "wdi": 26.5}, {"date": "2025-10-08", "joints": 4, "wdi": 11.0}, {"date": "2025-10-09", "joints": 2, "wdi": 1.5}, {"date": "2025-10-11", "joints": 7, "wdi": 9.75}, {"date": "2025-10-12", "joints": 1, "wdi": 12.0}, {"date": "2025-10-13", "joints": 3, "wdi": 16.75}, {"date": "2025-10-14", "joints": 2, "wdi": 16.0}, {"date": "2025-10-15", "joints": 3, "wdi": 5.5}, {"date": "2025-10-16", "joints": 5, "wdi": 4.0}, {"date": "2025-10-18", "joints": 4, "wdi": 6.5}, {"date": "2025-10-19", "joints": 4, "wdi": 10.5}, {"date": "2025-10-20", "joints": 3, "wdi": 2.25}, {"date": "2025-10-21", "joints": 3, "wdi": 24.0}, {"date": "2025-10-22", "joints": 3, "wdi": 24.0}, {"date": "2025-10-23", "joints": 4, "wdi": 24.0}, {"date": "2025-10-25", "joints": 9, "wdi": 54.0}, {"date": "2025-10-26", "joints": 21, "wdi": 60.0}, {"date": "2025-10-27", "joints": 21, "wdi": 59.25}, {"date": "2025-10-28", "joints": 24, "wdi": 78.75}, {"date": "2025-10-29", "joints": 27, "wdi": 75.0}, {"date": "2025-10-30", "joints": 23, "wdi": 69.0}, {"date": "2025-11-01", "joints": 40, "wdi": 86.75}, {"date": "2025-11-02", "joints": 39, "wdi": 91.25}, {"date": "2025-11-03", "joints": 22, "wdi": 30.0}, {"date": "2025-11-04", "joints": 17, "wdi": 47.5}, {"date": "2025-11-05", "joints": 27, "wdi": 84.0}, {"date": "2025-11-06", "joints": 35, "wdi": 90.5}, {"date": "2025-11-08", "joints": 25, "wdi": 68.0}, {"date": "2025-11-09", "joints": 31, "wdi": 73.0}, {"date": "2025-11-10", "joints": 26, "wdi": 55.5}, {"date": "2025-11-12", "joints": 51, "wdi": 105.0}, {"date": "2025-11-13", "joints": 44, "wdi": 96.75}, {"date": "2025-11-15", "joints": 36, "wdi": 73.5}, {"date": "2025-11-16", "joints": 16, "wdi": 32.0}, {"date": "2025-11-17", "joints": 36, "wdi": 64.25}, {"date": "2025-11-18", "joints": 53, "wdi": 79.0}, {"date": "2025-11-19", "joints": 39, "wdi": 68.5}, {"date": "2025-11-20", "joints": 54, "wdi": 62.75}, {"date": "2025-11-22", "joints": 54, "wdi": 64.5}, {"date": "2025-11-23", "joints": 55, "wdi": 99.5}, {"date": "2025-11-24", "joints": 77, "wdi": 109.0}, {"date": "2025-11-25", "joints": 66, "wdi": 105.25}, {"date": "2025-11-26", "joints": 13, "wdi": 28.0}, {"date": "2025-11-27", "joints": 35, "wdi": 72.0}, {"date": "2025-11-29", "joints": 60, "wdi": 109.5}, {"date": "2025-11-30", "joints": 60, "wdi": 131.25}, {"date": "2025-12-01", "joints": 49, "wdi": 179.25}, {"date": "2025-12-02", "joints": 49, "wdi": 167.75}, {"date": "2025-12-03", "joints": 50, "wdi": 139.25}, {"date": "2025-12-04", "joints": 63, "wdi": 124.75}, {"date": "2025-12-06", "joints": 69, "wdi": 131.75}, {"date": "2025-12-07", "joints": 38, "wdi": 77.5}, {"date": "2025-12-08", "joints": 26, "wdi": 62.0}, {"date": "2025-12-09", "joints": 27, "wdi": 75.0}, {"date": "2025-12-10", "joints": 18, "wdi": 58.0}, {"date": "2025-12-11", "joints": 29, "wdi": 67.0}, {"date": "2025-12-13", "joints": 14, "wdi": 40.5}, {"date": "2025-12-14", "joints": 14, "wdi": 37.0}, {"date": "2025-12-15", "joints": 16, "wdi": 37.0}, {"date": "2025-12-16", "joints": 15, "wdi": 38.0}, {"date": "2025-12-17", "joints": 68, "wdi": 121.5}, {"date": "2025-12-18", "joints": 55, "wdi": 110.75}, {"date": "2025-12-20", "joints": 63, "wdi": 119.75}, {"date": "2025-12-21", "joints": 43, "wdi": 110.0}, {"date": "2025-12-22", "joints": 54, "wdi": 118.0}, {"date": "2025-12-23", "joints": 56, "wdi": 105.25}, {"date": "2025-12-24", "joints": 52, "wdi": 123.0}, {"date": "2025-12-25", "joints": 54, "wdi": 126.5}, {"date": "2025-12-27", "joints": 64, "wdi": 121.75}, {"date": "2025-12-28", "joints": 67, "wdi": 115.0}, {"date": "2025-12-29", "joints": 76, "wdi": 116.75}, {"date": "2025-12-30", "joints": 48, "wdi": 97.25}, {"date": "2025-12-31", "joints": 43, "wdi": 72.0}, {"date": "2026-01-03", "joints": 52, "wdi": 76.0}, {"date": "2026-01-04", "joints": 66, "wdi": 80.75}, {"date": "2026-01-05", "joints": 98, "wdi": 117.0}, {"date": "2026-01-06", "joints": 44, "wdi": 85.5}, {"date": "2026-01-07", "joints": 42, "wdi": 72.75}, {"date": "2026-01-08", "joints": 41, "wdi": 80.5}, {"date": "2026-01-10", "joints": 31, "wdi": 55.75}, {"date": "2026-01-11", "joints": 34, "wdi": 68.0}, {"date": "2026-01-12", "joints": 9, "wdi": 64.0}, {"date": "2026-01-13", "joints": 16, "wdi": 53.5}, {"date": "2026-01-14", "joints": 11, "wdi": 58.0}, {"date": "2026-01-15", "joints": 6, "wdi": 62.0}, {"date": "2026-01-17", "joints": 5, "wdi": 22.0}, {"date": "2026-01-18", "joints": 6, "wdi": 52.0}, {"date": "2026-01-19", "joints": 6, "wdi": 52.0}, {"date": "2026-01-20", "joints": 6, "wdi": 48.0}, {"date": "2026-01-21", "joints": 15, "wdi": 41.0}, {"date": "2026-01-22", "joints": 17, "wdi": 58.5}, {"date": "2026-01-24", "joints": 19, "wdi": 57.0}, {"date": "2026-01-25", "joints": 18, "wdi": 63.5}, {"date": "2026-01-26", "joints": 12, "wdi": 43.0}, {"date": "2026-01-27", "joints": 17, "wdi": 62.0}, {"date": "2026-01-28", "joints": 11, "wdi": 44.0}, {"date": "2026-01-29", "joints": 13, "wdi": 45.0}, {"date": "2026-01-31", "joints": 15, "wdi": 55.5}, {"date": "2026-02-01", "joints": 13, "wdi": 51.0}, {"date": "2026-02-02", "joints": 10, "wdi": 36.5}, {"date": "2026-02-03", "joints": 12, "wdi": 33.0}, {"date": "2026-02-04", "joints": 17, "wdi": 42.0}, {"date": "2026-02-05", "joints": 11, "wdi": 41.0}, {"date": "2026-02-07", "joints": 16, "wdi": 55.0}, {"date": "2026-02-08", "joints": 14, "wdi": 34.0}, {"date": "2026-02-09", "joints": 21, "wdi": 53.5}, {"date": "2026-02-10", "joints": 15, "wdi": 36.75}, {"date": "2026-02-11", "joints": 20, "wdi": 56.25}, {"date": "2026-02-12", "joints": 15, "wdi": 37.75}, {"date": "2026-02-14", "joints": 20, "wdi": 53.0}, {"date": "2026-02-15", "joints": 19, "wdi": 54.75}, {"date": "2026-02-16", "joints": 23, "wdi": 61.0}, {"date": "2026-02-17", "joints": 16, "wdi": 47.25}, {"date": "2026-02-18", "joints": 19, "wdi": 49.0}, {"date": "2026-02-19", "joints": 19, "wdi": 36.0}, {"date": "2026-02-21", "joints": 18, "wdi": 35.5}, {"date": "2026-02-22", "joints": 17, "wdi": 36.0}, {"date": "2026-02-23", "joints": 27, "wdi": 45.75}, {"date": "2026-02-24", "joints": 30, "wdi": 49.0}, {"date": "2026-02-25", "joints": 32, "wdi": 54.0}, {"date": "2026-02-26", "joints": 27, "wdi": 39.5}, {"date": "2026-02-28", "joints": 32, "wdi": 47.0}, {"date": "2026-03-01", "joints": 29, "wdi": 53.0}, {"date": "2026-03-02", "joints": 19, "wdi": 33.0}, {"date": "2026-03-03", "joints": 21, "wdi": 43.0}, {"date": "2026-03-04", "joints": 17, "wdi": 33.75}, {"date": "2026-03-05", "joints": 12, "wdi": 32.0}, {"date": "2026-03-07", "joints": 21, "wdi": 47.0}, {"date": "2026-03-08", "joints": 24, "wdi": 46.75}, {"date": "2026-03-09", "joints": 25, "wdi": 49.0}, {"date": "2026-03-10", "joints": 29, "wdi": 57.0}, {"date": "2026-03-11", "joints": 21, "wdi": 45.25}, {"date": "2026-03-12", "joints": 25, "wdi": 53.25}, {"date": "2026-03-14", "joints": 23, "wdi": 42.75}, {"date": "2026-03-16", "joints": 22, "wdi": 38.75}, {"date": "2026-03-17", "joints": 15, "wdi": 27.5}, {"date": "2026-03-18", "joints": 17, "wdi": 45.5}, {"date": "2026-03-19", "joints": 16, "wdi": 42.5}, {"date": "2026-03-23", "joints": 20, "wdi": 58.75}, {"date": "2026-03-24", "joints": 24, "wdi": 49.5}, {"date": "2026-03-28", "joints": 24, "wdi": 38.0}, {"date": "2026-03-29", "joints": 31, "wdi": 47.0}, {"date": "2026-03-30", "joints": 21, "wdi": 35.0}, {"date": "2026-03-31", "joints": 25, "wdi": 49.5}, {"date": "2026-04-01", "joints": 28, "wdi": 44.0}, {"date": "2026-04-02", "joints": 34, "wdi": 52.0}, {"date": "2026-04-04", "joints": 32, "wdi": 59.75}, {"date": "2026-04-05", "joints": 33, "wdi": 47.5}, {"date": "2026-04-06", "joints": 37, "wdi": 51.0}, {"date": "2026-04-07", "joints": 14, "wdi": 46.25}, {"date": "2026-04-08", "joints": 14, "wdi": 42.5}, {"date": "2026-04-09", "joints": 30, "wdi": 37.5}, {"date": "2026-04-11", "joints": 33, "wdi": 51.0}, {"date": "2026-04-12", "joints": 27, "wdi": 32.25}, {"date": "2026-04-13", "joints": 37, "wdi": 47.75}, {"date": "2026-04-14", "joints": 38, "wdi": 43.5}, {"date": "2026-04-15", "joints": 34, "wdi": 45.5}, {"date": "2026-04-16", "joints": 35, "wdi": 75.5}, {"date": "2026-04-18", "joints": 25, "wdi": 43.5}, {"date": "2026-04-19", "joints": 40, "wdi": 62.0}, {"date": "2026-04-20", "joints": 44, "wdi": 56.5}, {"date": "2026-04-21", "joints": 44, "wdi": 54.75}, {"date": "2026-04-22", "joints": 39, "wdi": 54.5}, {"date": "2026-04-23", "joints": 38, "wdi": 58.5}, {"date": "2026-04-25", "joints": 30, "wdi": 53.5}, {"date": "2026-04-26", "joints": 62, "wdi": 74.0}, {"date": "2026-04-27", "joints": 43, "wdi": 51.25}, {"date": "2026-04-28", "joints": 33, "wdi": 44.75}, {"date": "2026-04-29", "joints": 25, "wdi": 49.25}, {"date": "2026-04-30", "joints": 22, "wdi": 48.5}, {"date": "2026-05-02", "joints": 19, "wdi": 38.0}, {"date": "2026-05-03", "joints": 22, "wdi": 37.5}, {"date": "2026-05-04", "joints": 16, "wdi": 40.0}, {"date": "2026-05-05", "joints": 6, "wdi": 32.0}, {"date": "2026-05-06", "joints": 17, "wdi": 35.0}, {"date": "2026-05-07", "joints": 20, "wdi": 43.75}, {"date": "2026-05-09", "joints": 31, "wdi": 38.5}, {"date": "2026-05-10", "joints": 21, "wdi": 47.0}, {"date": "2026-05-11", "joints": 33, "wdi": 40.25}, {"date": "2026-05-12", "joints": 31, "wdi": 52.5}, {"date": "2026-05-13", "joints": 26, "wdi": 62.75}, {"date": "2026-05-14", "joints": 20, "wdi": 53.0}, {"date": "2026-05-16", "joints": 27, "wdi": 76.75}, {"date": "2026-05-17", "joints": 26, "wdi": 59.0}, {"date": "2026-05-18", "joints": 31, "wdi": 57.0}, {"date": "2026-05-19", "joints": 42, "wdi": 60.5}, {"date": "2026-05-20", "joints": 25, "wdi": 60.25}, {"date": "2026-05-21", "joints": 17, "wdi": 69.0}, {"date": "2026-05-23", "joints": 29, "wdi": 69.5}], "weekly_rt": [{"week_start": "2025-07-26", "rt_total": 15, "rej_total": 0, "per_welder": [{"stamp": "W-01", "rt": 10, "rej": 0}, {"stamp": "W-02", "rt": 5, "rej": 0}]}, {"week_start": "2025-08-02", "rt_total": 65, "rej_total": 0, "per_welder": [{"stamp": "W-02", "rt": 36, "rej": 0}, {"stamp": "W-01", "rt": 29, "rej": 0}]}, {"week_start": "2025-09-06", "rt_total": 82, "rej_total": 0, "per_welder": [{"stamp": "W-02", "rt": 42, "rej": 0}, {"stamp": "W-01", "rt": 36, "rej": 0}, {"stamp": "W-05", "rt": 4, "rej": 0}]}, {"week_start": "2025-09-27", "rt_total": 9, "rej_total": 0, "per_welder": [{"stamp": "W-01", "rt": 6, "rej": 0}, {"stamp": "W-02", "rt": 1, "rej": 0}, {"stamp": "W-06", "rt": 1, "rej": 0}, {"stamp": "W-07", "rt": 1, "rej": 0}]}, {"week_start": "2025-10-04", "rt_total": 32, "rej_total": 0, "per_welder": [{"stamp": "W-01", "rt": 15, "rej": 0}, {"stamp": "W-02", "rt": 12, "rej": 0}, {"stamp": "W-06", "rt": 3, "rej": 0}, {"stamp": "W-05", "rt": 2, "rej": 0}]}, {"week_start": "2025-10-11", "rt_total": 26, "rej_total": 0, "per_welder": [{"stamp": "W-02", "rt": 13, "rej": 0}, {"stamp": "W-01", "rt": 10, "rej": 0}, {"stamp": "W-07", "rt": 2, "rej": 0}, {"stamp": "W-06", "rt": 1, "rej": 0}]}, {"week_start": "2025-10-18", "rt_total": 39, "rej_total": 0, "per_welder": [{"stamp": "W-01", "rt": 16, "rej": 0}, {"stamp": "W-02", "rt": 12, "rej": 0}, {"stamp": "W-06", "rt": 7, "rej": 0}, {"stamp": "W-07", "rt": 4, "rej": 0}]}, {"week_start": "2025-10-25", "rt_total": 8, "rej_total": 0, "per_welder": [{"stamp": "W-07", "rt": 7, "rej": 0}, {"stamp": "W-06", "rt": 1, "rej": 0}]}, {"week_start": "2025-11-08", "rt_total": 15, "rej_total": 0, "per_welder": [{"stamp": "W-06", "rt": 8, "rej": 0}, {"stamp": "W-07", "rt": 7, "rej": 0}]}, {"week_start": "2025-11-15", "rt_total": 29, "rej_total": 0, "per_welder": [{"stamp": "W-07", "rt": 15, "rej": 0}, {"stamp": "W-06", "rt": 14, "rej": 0}]}, {"week_start": "2025-11-22", "rt_total": 92, "rej_total": 0, "per_welder": [{"stamp": "W-07", "rt": 47, "rej": 0}, {"stamp": "W-06", "rt": 34, "rej": 0}, {"stamp": "W-02", "rt": 5, "rej": 0}, {"stamp": "W-01", "rt": 4, "rej": 0}, {"stamp": "W-05", "rt": 2, "rej": 0}]}, {"week_start": "2025-11-29", "rt_total": 36, "rej_total": 0, "per_welder": [{"stamp": "W-06", "rt": 16, "rej": 0}, {"stamp": "W-02", "rt": 11, "rej": 0}, {"stamp": "W-07", "rt": 8, "rej": 0}, {"stamp": "W-01", "rt": 1, "rej": 0}]}, {"week_start": "2025-12-06", "rt_total": 37, "rej_total": 0, "per_welder": [{"stamp": "W-07", "rt": 11, "rej": 0}, {"stamp": "W-01", "rt": 9, "rej": 0}, {"stamp": "W-02", "rt": 9, "rej": 0}, {"stamp": "W-06", "rt": 8, "rej": 0}]}, {"week_start": "2025-12-13", "rt_total": 28, "rej_total": 0, "per_welder": [{"stamp": "W-07", "rt": 12, "rej": 0}, {"stamp": "W-02", "rt": 8, "rej": 0}, {"stamp": "W-06", "rt": 8, "rej": 0}]}, {"week_start": "2025-12-20", "rt_total": 24, "rej_total": 0, "per_welder": [{"stamp": "W-06", "rt": 10, "rej": 0}, {"stamp": "W-01", "rt": 7, "rej": 0}, {"stamp": "W-02", "rt": 7, "rej": 0}]}, {"week_start": "2025-12-27", "rt_total": 7, "rej_total": 0, "per_welder": [{"stamp": "W-02", "rt": 4, "rej": 0}, {"stamp": "W-01", "rt": 2, "rej": 0}, {"stamp": "W-06", "rt": 1, "rej": 0}]}, {"week_start": "2026-01-03", "rt_total": 58, "rej_total": 1, "per_welder": [{"stamp": "W-01", "rt": 33, "rej": 1}, {"stamp": "W-02", "rt": 14, "rej": 0}, {"stamp": "W-06", "rt": 11, "rej": 0}]}, {"week_start": "2026-01-10", "rt_total": 31, "rej_total": 3, "per_welder": [{"stamp": "W-01", "rt": 25, "rej": 2}, {"stamp": "W-02", "rt": 6, "rej": 1}]}, {"week_start": "2026-01-17", "rt_total": 5, "rej_total": 2, "per_welder": [{"stamp": "W-01", "rt": 4, "rej": 2}, {"stamp": "W-02", "rt": 1, "rej": 0}]}, {"week_start": "2026-01-24", "rt_total": 71, "rej_total": 2, "per_welder": [{"stamp": "W-02", "rt": 27, "rej": 0}, {"stamp": "W-01", "rt": 20, "rej": 1}, {"stamp": "W-06", "rt": 17, "rej": 1}, {"stamp": "W-05", "rt": 4, "rej": 0}, {"stamp": "W-08", "rt": 3, "rej": 0}]}, {"week_start": "2026-01-31", "rt_total": 29, "rej_total": 4, "per_welder": [{"stamp": "W-02", "rt": 10, "rej": 1}, {"stamp": "W-05", "rt": 10, "rej": 1}, {"stamp": "W-06", "rt": 6, "rej": 1}, {"stamp": "W-07", "rt": 2, "rej": 0}, {"stamp": "W-01", "rt": 1, "rej": 1}]}, {"week_start": "2026-02-07", "rt_total": 24, "rej_total": 0, "per_welder": [{"stamp": "W-06", "rt": 10, "rej": 0}, {"stamp": "W-02", "rt": 7, "rej": 0}, {"stamp": "W-01", "rt": 5, "rej": 0}, {"stamp": "W-05", "rt": 2, "rej": 0}]}, {"week_start": "2026-02-14", "rt_total": 40, "rej_total": 2, "per_welder": [{"stamp": "W-02", "rt": 29, "rej": 0}, {"stamp": "W-08", "rt": 6, "rej": 1}, {"stamp": "W-05", "rt": 2, "rej": 1}, {"stamp": "W-06", "rt": 2, "rej": 0}, {"stamp": "W-07", "rt": 1, "rej": 0}]}, {"week_start": "2026-02-21", "rt_total": 17, "rej_total": 5, "per_welder": [{"stamp": "W-08", "rt": 8, "rej": 2}, {"stamp": "W-05", "rt": 4, "rej": 2}, {"stamp": "W-02", "rt": 3, "rej": 0}, {"stamp": "W-06", "rt": 2, "rej": 1}]}, {"week_start": "2026-02-28", "rt_total": 26, "rej_total": 4, "per_welder": [{"stamp": "W-02", "rt": 10, "rej": 0}, {"stamp": "W-08", "rt": 5, "rej": 0}, {"stamp": "W-04", "rt": 4, "rej": 3}, {"stamp": "W-10", "rt": 3, "rej": 0}, {"stamp": "W-05", "rt": 2, "rej": 1}, {"stamp": "W-01", "rt": 1, "rej": 0}, {"stamp": "W-06", "rt": 1, "rej": 0}]}, {"week_start": "2026-03-07", "rt_total": 57, "rej_total": 9, "per_welder": [{"stamp": "W-02", "rt": 23, "rej": 3}, {"stamp": "W-08", "rt": 8, "rej": 1}, {"stamp": "W-01", "rt": 6, "rej": 0}, {"stamp": "W-09", "rt": 6, "rej": 1}, {"stamp": "W-05", "rt": 4, "rej": 2}, {"stamp": "W-10", "rt": 4, "rej": 2}, {"stamp": "W-06", "rt": 3, "rej": 0}, {"stamp": "W-04", "rt": 2, "rej": 0}, {"stamp": "W-07", "rt": 1, "rej": 0}]}, {"week_start": "2026-03-14", "rt_total": 21, "rej_total": 0, "per_welder": [{"stamp": "W-08", "rt": 11, "rej": 0}, {"stamp": "W-06", "rt": 3, "rej": 0}, {"stamp": "W-10", "rt": 3, "rej": 0}, {"stamp": "W-02", "rt": 2, "rej": 0}, {"stamp": "W-09", "rt": 2, "rej": 0}]}, {"week_start": "2026-03-21", "rt_total": 18, "rej_total": 4, "per_welder": [{"stamp": "W-10", "rt": 5, "rej": 2}, {"stamp": "W-06", "rt": 3, "rej": 0}, {"stamp": "W-08", "rt": 3, "rej": 0}, {"stamp": "W-09", "rt": 3, "rej": 1}, {"stamp": "W-01", "rt": 1, "rej": 0}, {"stamp": "W-02", "rt": 1, "rej": 0}, {"stamp": "W-05", "rt": 1, "rej": 1}, {"stamp": "W-07", "rt": 1, "rej": 0}]}, {"week_start": "2026-03-28", "rt_total": 36, "rej_total": 4, "per_welder": [{"stamp": "W-08", "rt": 12, "rej": 1}, {"stamp": "W-09", "rt": 8, "rej": 3}, {"stamp": "W-02", "rt": 6, "rej": 0}, {"stamp": "W-06", "rt": 4, "rej": 0}, {"stamp": "W-01", "rt": 2, "rej": 0}, {"stamp": "W-07", "rt": 2, "rej": 0}, {"stamp": "W-10", "rt": 2, "rej": 0}]}, {"week_start": "2026-04-04", "rt_total": 58, "rej_total": 5, "per_welder": [{"stamp": "W-02", "rt": 29, "rej": 1}, {"stamp": "W-09", "rt": 12, "rej": 2}, {"stamp": "W-06", "rt": 8, "rej": 0}, {"stamp": "W-08", "rt": 5, "rej": 0}, {"stamp": "W-10", "rt": 3, "rej": 1}, {"stamp": "W-05", "rt": 1, "rej": 1}]}, {"week_start": "2026-04-18", "rt_total": 12, "rej_total": 1, "per_welder": [{"stamp": "W-09", "rt": 6, "rej": 0}, {"stamp": "W-02", "rt": 3, "rej": 0}, {"stamp": "W-06", "rt": 3, "rej": 1}]}, {"week_start": "2026-04-25", "rt_total": 53, "rej_total": 4, "per_welder": [{"stamp": "W-06", "rt": 20, "rej": 2}, {"stamp": "W-02", "rt": 13, "rej": 0}, {"stamp": "W-09", "rt": 13, "rej": 2}, {"stamp": "W-07", "rt": 4, "rej": 0}, {"stamp": "W-01", "rt": 1, "rej": 0}, {"stamp": "W-05", "rt": 1, "rej": 0}, {"stamp": "W-08", "rt": 1, "rej": 0}]}, {"week_start": "2026-05-02", "rt_total": 25, "rej_total": 1, "per_welder": [{"stamp": "W-07", "rt": 12, "rej": 1}, {"stamp": "W-06", "rt": 6, "rej": 0}, {"stamp": "W-09", "rt": 3, "rej": 0}, {"stamp": "W-10", "rt": 3, "rej": 0}, {"stamp": "W-02", "rt": 1, "rej": 0}]}, {"week_start": "2026-05-09", "rt_total": 37, "rej_total": 2, "per_welder": [{"stamp": "W-07", "rt": 18, "rej": 1}, {"stamp": "W-09", "rt": 8, "rej": 1}, {"stamp": "W-21", "rt": 5, "rej": 0}, {"stamp": "W-06", "rt": 3, "rej": 0}, {"stamp": "W-08", "rt": 2, "rej": 0}, {"stamp": "W-10", "rt": 1, "rej": 0}]}, {"week_start": "2026-05-16", "rt_total": 46, "rej_total": 0, "per_welder": [{"stamp": "W-07", "rt": 32, "rej": 0}, {"stamp": "W-21", "rt": 8, "rej": 0}, {"stamp": "W-06", "rt": 2, "rej": 0}, {"stamp": "W-09", "rt": 2, "rej": 0}, {"stamp": "W-02", "rt": 1, "rej": 0}, {"stamp": "W-11", "rt": 1, "rej": 0}]}]};

  function projNormalizeStamp(s) {
    // 'W-1', 'W-01', 'W-001' all normalize to 'W-001'
    if (!s) return null;
    var m = String(s).match(/^W-(\d+)$/);
    if (!m) return null;
    return 'W-' + ('000' + m[1]).slice(-3);
  }
  function projInitials(name) {
    if (!name) return '?';
    var parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  function projRepairPill(rate, tested) {
    if (rate == null || tested === 0) {
      return '<span class="proj-pill proj-pill-na">—</span>';
    }
    var cls = 'proj-pill-excellent';
    if (rate > 20) cls = 'proj-pill-review';
    else if (rate > 10) cls = 'proj-pill-watch';
    else if (rate > 5) cls = 'proj-pill-normal';
    return '<span class="proj-pill ' + cls + '">' + rate.toFixed(1) + '%</span>';
  }
  // ASME IX continuity: welder qualification expires 6 months after last RT shot.
  // Returns days remaining (negative = expired) or null if welder never had RT.
  function projDaysUntilExpiry(lastRtIso) {
    if (!lastRtIso) return null;
    var lastRt = new Date(lastRtIso + 'T00:00:00');
    if (isNaN(lastRt.getTime())) return null;
    var expiry = new Date(lastRt);
    expiry.setMonth(expiry.getMonth() + 6);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  }
  function projExpiryPill(lastRtIso) {
    var d = projDaysUntilExpiry(lastRtIso);
    var dot, cls, label;
    if (d === null)   { dot = '#4B5563'; cls = 'na';      label = '—'; }
    else if (d <= 0)  { dot = '#EF4444'; cls = 'expired'; label = 'expired'; }
    else if (d <= 30) { dot = '#F59E0B'; cls = 'watch';   label = d + 'd'; }
    else              { dot = '#10B981'; cls = 'ok';      label = d + 'd'; }
    return '<span class="proj-expiry-cell ' + cls + '">' +
           '<span class="proj-expiry-dot" style="background:' + dot + ';"></span>' +
           label + '</span>';
  }
  function projFmtDate(iso) {
    if (!iso) return '—';
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var parts = iso.split('-');
    if (parts.length !== 3) return iso;
    return parseInt(parts[2], 10) + ' ' + months[parseInt(parts[1], 10) - 1] + ' ' + parts[0].slice(2);
  }
  function projFmtNum(n) {
    if (n == null || isNaN(n)) return '—';
    return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  function renderProjectHTU() {
    var data = PROJECT_HTU;
    if (!data) return;

    var dateEl = document.getElementById('proj-htu-tab-date');
    if (dateEl) dateEl.textContent = '(last updated: ' + projFmtDate(data.data_date) + ')';

    var t = data.totals;
    // ---- Manual summary override: W-010 (Omar Rajoob) ----
    // Mirror the +14 repairs / +14 tested adjustment we apply to the W-010
    // row so the headline repair rate matches the leaderboard. Project
    // joint count and WDI are NOT touched. Remove with the W-010 row block
    // below once the spreadsheet catches up.
    t = Object.assign({}, t);
    t.total_tested = t.total_tested + 14;
    t.total_repair = t.total_repair + 14;
    t.project_repair_rate = Math.round((t.total_repair / t.total_tested) * 1000) / 10;

    document.getElementById('proj-htu-total-wdi').textContent = projFmtNum(Math.round(t.total_wdi));
    document.getElementById('proj-htu-total-wdi-sub').textContent = 'in ' + t.total_lines + ' lines';
    document.getElementById('proj-htu-completed-wdi').textContent = projFmtNum(Math.round(t.completed_wdi));
    var pctDone = t.total_wdi > 0 ? Math.round(t.completed_wdi / t.total_wdi * 100) : 0;
    document.getElementById('proj-htu-completed-wdi-sub').textContent = pctDone + '% done';
    document.getElementById('proj-htu-tested').textContent = projFmtNum(t.total_tested);
    var pctTested = t.completed_joints > 0 ? Math.round(t.total_tested / t.completed_joints * 100) : 0;
    document.getElementById('proj-htu-tested-pct').textContent = pctTested + '% of joints';
    document.getElementById('proj-htu-repair-rate').textContent = (t.project_repair_rate != null) ? t.project_repair_rate.toFixed(1) + '%' : '—';
    document.getElementById('proj-htu-repair-sub').textContent = t.total_repair + ' rejected of ' + t.total_tested;

    // Build welder rows: PIPING_WELDERS provides identity, joint history provides stats
    // Map joint stats by normalized stamp
    var statsByStamp = {};
    data.welders.forEach(function(w) {
      var key = projNormalizeStamp(w.stamp);
      if (key) statsByStamp[key] = w;
    });

    // Combine: for every PIPING_WELDERS entry, attach stats (or empty)
    // Note: 'tested' = ACC + REJ (final result, after any RS reshoot has been resolved).
    // RS results are NDT crew issues — once they're reshot and judged, the after-repair
    // verdict is what counts. RS that hasn't been reshot yet is treated as pending.
    var combined = PIPING_WELDERS.map(function(pw) {
      var s = statsByStamp[pw.stamp] || { joints: 0, dia_inch: 0, tested: 0, acc: 0, rej: 0, repair_rate: null, last_weld: null, last_rt: null };
      return {
        stamp: pw.stamp,
        name: pw.name,
        joints: s.joints,
        dia_inch: s.dia_inch,
        tested: s.tested,
        repair: s.rej,
        repair_rate: s.repair_rate,
        last_weld: s.last_weld,
        last_rt: s.last_rt,
      };
    });

    // ---- Manual row override: W-010 (Omar Rajoob) ----
    // Real RT history has additional joints/repairs not yet logged in the
    // joint history sheet. We patch this welder's displayed numbers ONLY —
    // project totals (total_joints, total_wdi, total_tested, project repair
    // rate, daily throughput) are NOT touched and continue to come straight
    // from the spreadsheet. Remove this block once the spreadsheet catches up.
    combined.forEach(function(w) {
      if (w.stamp === 'W-010') {
        w.tested = 34;
        w.repair = 19;
        w.repair_rate = Math.round((19 / 34) * 1000) / 10;  // 55.9
      }
    });

    // Filter to active welders only (joints > 0)
    var active = combined.filter(function(w) { return w.joints > 0; });

    // Sort: anyone with a real repair rate (tested >= 1) by rate ASC;
    // welders with no RT verdict yet at the end, sorted by joints DESC.
    var rated   = active.filter(function(w) { return w.tested >= 1; });
    var unrated = active.filter(function(w) { return w.tested === 0; });
    rated.sort(function(a, b)   { return a.repair_rate - b.repair_rate; });
    unrated.sort(function(a, b) { return b.joints - a.joints; });

    var tbody = document.getElementById('proj-htu-leaderboard');
    var html = '';

    function rowHtml(w, isLowSample) {
      var photoKey = 'piping:' + w.stamp;
      var photoSrc = WELDER_PHOTOS[photoKey] || '';
      var avatar = photoSrc
        ? '<div class="proj-avatar"><img src="' + photoSrc + '" alt="' + w.stamp + '" /></div>'
        : '<div class="proj-avatar">' + projInitials(w.name) + '</div>';
      var rate = projRepairPill(w.repair_rate, w.tested);
      var meta;
      {
        meta = 'tested ' + w.tested + ' of ' + w.joints;
      }
      return '<tr>' +
        '<td><div class="proj-welder-cell">' + avatar +
          '<div><div class="proj-welder-name">' + w.stamp + ' ' + w.name + '</div>' +
          '<div class="proj-welder-meta">' + meta + '</div></div>' +
        '</div></td>' +
        '<td class="proj-num">' + projFmtNum(w.joints) + '</td>' +
        '<td class="proj-num">' + projFmtNum(Math.round(w.dia_inch)) + '</td>' +
        '<td class="proj-num">' + w.tested + '</td>' +
        '<td class="proj-num">' + w.repair + '</td>' +
        '<td class="proj-num">' + rate + '</td>' +
        '<td class="proj-last">' + projFmtDate(w.last_weld) + '</td>' +
        '<td class="proj-last">' + projFmtDate(w.last_rt)   + '</td>' +
        '<td>' + projExpiryPill(w.last_rt) + '</td>' +
        '</tr>';
    }

    rated.forEach(function(w)   { html += rowHtml(w, false); });
    unrated.forEach(function(w) { html += rowHtml(w, true);  });

    var inactiveCount = PIPING_WELDERS.length - active.length;
    if (inactiveCount > 0) {
      html += '<tr class="proj-low-sample-row"><td colspan="9">+ ' + inactiveCount + ' welders with no activity in this project</td></tr>';
    }

    tbody.innerHTML = html;

    renderProjectHTUDailyChart(data.daily_throughput);
    renderProjectHTUWeeklyChart(data.weekly_rt);
  }

  // Apply the W-010 (Omar Rajoob) display override to the weekly chart too.
  // Same +14 tested / +14 repair the leaderboard + summary already show;
  // distributed evenly across MARCH 2026 weeks (Sat-anchored: Mar 7, 14,
  // 21, 28) because that's when these joints actually went through —
  // not the most recent months. Remove together with the W-010 override
  // blocks above once the spreadsheet catches up.
  function applyW010WeeklyOverride(weekly) {
    if (!weekly || !weekly.length) return weekly;
    var EXTRA_RT = 14, EXTRA_REJ = 14;
    var MARCH_PREFIX = '2026-03';
    var TARGET = projNormalizeStamp('W-010');

    // Every week with a Saturday anchor in March 2026. For each, note
    // whether W-010 already has an entry (we'll add to it) or not
    // (we'll insert one).
    var hits = [];
    for (var i = 0; i < weekly.length; i++) {
      if (String(weekly[i].week_start || '').indexOf(MARCH_PREFIX) !== 0) continue;
      var pwArr = weekly[i].per_welder || [];
      var pwIdx = -1;
      for (var j = 0; j < pwArr.length; j++) {
        if (projNormalizeStamp(pwArr[j].stamp) === TARGET) { pwIdx = j; break; }
      }
      hits.push({ wi: i, pj: pwIdx });
    }
    if (!hits.length) return weekly;

    // Clone so we don't mutate the original PROJECT_HTU
    var out = weekly.map(function (wk) {
      return {
        week_start: wk.week_start,
        rt_total: wk.rt_total,
        rej_total: wk.rej_total,
        per_welder: (wk.per_welder || []).map(function (pw) {
          return { stamp: pw.stamp, rt: pw.rt, rej: pw.rej };
        }),
      };
    });

    // Even distribution across March weeks; remainders go to the first N.
    var n = hits.length;
    var baseRT  = Math.floor(EXTRA_RT  / n);
    var baseRej = Math.floor(EXTRA_REJ / n);
    var remRT  = EXTRA_RT  - baseRT  * n;
    var remRej = EXTRA_REJ - baseRej * n;

    hits.forEach(function (h, idx) {
      var rtShare  = baseRT  + (idx < remRT  ? 1 : 0);
      var rejShare = baseRej + (idx < remRej ? 1 : 0);
      var wk = out[h.wi];
      var pw;
      if (h.pj >= 0) {
        pw = wk.per_welder[h.pj];
      } else {
        // No W-010 entry in this March week — insert one. Use 'W-10' to
        // match the raw stamp form used elsewhere in this JSON.
        pw = { stamp: 'W-10', rt: 0, rej: 0 };
        wk.per_welder.push(pw);
      }
      pw.rt        += rtShare;
      pw.rej       += rejShare;
      wk.rt_total  += rtShare;
      wk.rej_total += rejShare;
    });

    // Re-sort per-welder by RT count DESC in the weeks we touched
    hits.forEach(function (h) {
      out[h.wi].per_welder.sort(function (a, b) { return b.rt - a.rt; });
    });
    return out;
  }

  // Weekly RT shots + repair-rate chart (OPCO week = Sat..Thu, Fri off).
  // Bars = RT shot count (left axis); line = repair rate % (right axis).
  // Hover any bar -> per-welder breakdown tooltip.
  function renderProjectHTUWeeklyChart(weekly) {
    var panel = document.getElementById('proj-htu-weekly-panel');
    var svg   = document.getElementById('proj-htu-weekly-chart');
    var tt    = document.getElementById('proj-htu-weekly-tt');
    var sum   = document.getElementById('proj-htu-weekly-summary');
    if (!panel || !svg || !tt) return;
    // Apply the W-010 manual override to the weekly aggregate too.
    weekly = applyW010WeeklyOverride(weekly);
    // Hide entirely if no data (e.g. older JSON without weekly_rt)
    if (!weekly || !weekly.length) { panel.style.display = 'none'; return; }
    panel.style.display = '';

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    var W = 1280, H = 280, ML = 42, MR = 42, MT = 14, MB = 38;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var plotW = W - ML - MR, plotH = H - MT - MB;
    var n = weekly.length, slot = plotW / n, barW = Math.max(4, slot * 0.55);
    var maxRT = 0;
    weekly.forEach(function (w) { if (w.rt_total > maxRT) maxRT = w.rt_total; });
    maxRT = Math.max(50, Math.ceil(maxRT / 50) * 50);
    // Cumulative (running) repair rate per week. Last value matches the
    // overall project rate shown in the top summary. Weekly rate stays
    // available in the tooltip; the line is the running total.
    var cumRT = 0, cumRej = 0;
    var cumPcts = weekly.map(function (w) {
      cumRT  += w.rt_total;
      cumRej += w.rej_total;
      return cumRT ? cumRej / cumRT * 100 : 0;
    });
    var maxPct = 0;
    cumPcts.forEach(function (p) { if (p > maxPct) maxPct = p; });
    maxPct = Math.max(8, Math.ceil(maxPct / 2) * 2);

    var NS = 'http://www.w3.org/2000/svg';
    function el(name, attrs, txt) {
      var e = document.createElementNS(NS, name);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      if (txt != null) e.textContent = txt;
      svg.appendChild(e);
      return e;
    }
    // Theme-aware colors
    var dark = document.body && document.body.classList.contains('dark');
    var gridCol = dark ? '#30363d' : 'rgba(0,0,0,0.10)';
    var axisRT  = dark ? '#5DA3E0' : '#185fa5';
    var axisPct = dark ? '#EF9F27' : '#9c7d3a';
    var labelCol= dark ? '#8b949e' : '#888780';
    var barCol  = dark ? '#5DA3E0' : '#185fa5';
    var lineCol = dark ? '#EF9F27' : '#9c7d3a';

    // Grid + left axis (RT count)
    [0, 0.25, 0.5, 0.75, 1].forEach(function (r) {
      var y = MT + plotH * (1 - r);
      el('line', { x1: ML, y1: y, x2: W - MR, y2: y, stroke: gridCol, 'stroke-width': 0.5, 'stroke-dasharray': '2 3' });
      el('text', { x: ML - 6, y: y + 3, 'font-size': 9, fill: axisRT, 'text-anchor': 'end' }, Math.round(maxRT * r));
    });
    // Right axis (repair %)
    [0, 0.5, 1].forEach(function (r) {
      var y = MT + plotH * (1 - r);
      el('text', { x: W - MR + 6, y: y + 3, 'font-size': 9, fill: axisPct, 'text-anchor': 'start' }, (maxPct * r).toFixed(0) + '%');
    });

    // Label cadence — try to show ~12-15 labels max
    var labelStep = Math.max(1, Math.ceil(n / 14));

    // Bars + invisible hit areas
    weekly.forEach(function (wk, i) {
      var cx = ML + i * slot + slot / 2;
      var bx = cx - barW / 2;
      var bh = (wk.rt_total / maxRT) * plotH;
      var by = MT + plotH - bh;
      var bar = el('rect', {
        class: 'proj-weekly-bar',
        'data-idx': i,
        x: bx.toFixed(1), y: by.toFixed(1),
        width: barW.toFixed(1), height: bh.toFixed(1),
        fill: barCol, opacity: 0.62, rx: 2
      });
      el('rect', {
        class: 'proj-weekly-hit', 'data-idx': i,
        x: (ML + i * slot).toFixed(1), y: MT,
        width: slot.toFixed(1), height: plotH
      });
      if (i % labelStep === 0) {
        var lbl = shortWeekLabel(wk.week_start);
        el('text', { x: cx.toFixed(1), y: MT + plotH + 14, 'font-size': 9, fill: labelCol, 'text-anchor': 'middle' }, lbl);
      }
    });

    // Line overlay — cumulative project repair rate (running total).
    // Weekly rate is in the tooltip; the line is the running total so
    // the final point lands on the project's overall repair rate.
    var pts = weekly.map(function (wk, i) {
      var cx = ML + i * slot + slot / 2;
      var pct = cumPcts[i];
      var py = MT + plotH * (1 - Math.min(pct, maxPct) / maxPct);
      return { x: cx, y: py, pct: pct };
    });
    el('polyline', {
      points: pts.map(function (p) { return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' '),
      fill: 'none', stroke: lineCol, 'stroke-width': 1.8, opacity: 0.85
    });
    pts.forEach(function (p) {
      el('circle', { cx: p.x.toFixed(1), cy: p.y.toFixed(1), r: 2.8, fill: lineCol, stroke: dark ? '#0d1117' : '#ffffff', 'stroke-width': 1.2 });
    });

    // Summary line (top-right of panel header)
    if (sum) {
      var totRT  = weekly.reduce(function (s, w) { return s + w.rt_total;  }, 0);
      var totRej = weekly.reduce(function (s, w) { return s + w.rej_total; }, 0);
      var avgPct = totRT ? totRej / totRT * 100 : 0;
      sum.textContent = n + ' weeks · ' + totRT + ' RT / ' + totRej + ' rej · avg ' + avgPct.toFixed(1) + '%';
    }

    // --- Tooltip ---
    var wrap = svg.parentNode; // .proj-chart-wrap (position:relative)
    function showTip(i, evt) {
      var wk = weekly[i];
      var pct = wk.rt_total ? wk.rej_total / wk.rt_total * 100 : 0;
      var html = '<div class="proj-weekly-tt-title">Week of ' + longWeekLabel(wk.week_start) + '</div>'
        + '<div class="proj-weekly-tt-totals">'
        + '<span>RT: <span class="v-rt">' + wk.rt_total + '</span></span>'
        + '<span>Rep: <span class="v-rep">' + wk.rej_total + '</span></span>'
        + '<span>Rate: <span class="v-pct">' + pct.toFixed(1) + '%</span></span>'
        + '</div>'
        + '<div class="proj-weekly-tt-header"><div class="proj-weekly-tt-row" style="padding:0;">'
        + '<div>Welder</div><div></div><div style="text-align:right;">RT</div><div style="text-align:right;">REJ</div>'
        + '</div></div>';
      (wk.per_welder || []).forEach(function (pw) {
        var rejTxt = pw.rej > 0 ? pw.rej : '—';
        var rejCls = pw.rej > 0 ? '' : ' zero';
        html += '<div class="proj-weekly-tt-row">'
          + '<div class="proj-weekly-tt-w">' + esc(pw.stamp) + '</div><div></div>'
          + '<div class="proj-weekly-tt-rt">' + pw.rt + '</div>'
          + '<div class="proj-weekly-tt-rej' + rejCls + '">' + rejTxt + '</div>'
          + '</div>';
      });
      tt.innerHTML = html;
      tt.classList.add('show');
      var rect = wrap.getBoundingClientRect();
      var x = evt.clientX - rect.left + 12;
      var y = evt.clientY - rect.top  + 12;
      var ttW = tt.offsetWidth || 220;
      var ttH = tt.offsetHeight || 200;
      if (x + ttW > rect.width - 8)  x = evt.clientX - rect.left - ttW - 12;
      if (y + ttH > rect.height - 8) y = Math.max(8, evt.clientY - rect.top - ttH - 12);
      tt.style.left = x + 'px';
      tt.style.top  = y + 'px';
    }
    function hideTip() { tt.classList.remove('show'); }
    function resetBars() {
      var bars = svg.querySelectorAll('.proj-weekly-bar');
      for (var j = 0; j < bars.length; j++) bars[j].setAttribute('opacity', 0.62);
    }
    svg.onmousemove = function (e) {
      var t = e.target;
      if (t && t.classList && (t.classList.contains('proj-weekly-bar') || t.classList.contains('proj-weekly-hit'))) {
        var idx = parseInt(t.getAttribute('data-idx'), 10);
        if (!isNaN(idx)) {
          var bars = svg.querySelectorAll('.proj-weekly-bar');
          for (var j = 0; j < bars.length; j++) bars[j].setAttribute('opacity', j === idx ? 1 : 0.45);
          showTip(idx, e);
          return;
        }
      }
      resetBars();
      hideTip();
    };
    svg.onmouseleave = function () { resetBars(); hideTip(); };
  }
  // Helpers — week label formatting
  function shortWeekLabel(iso) {
    if (!iso) return '';
    var p = iso.split('-'); if (p.length < 3) return iso;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[parseInt(p[1],10)-1] + ' ' + parseInt(p[2], 10);
  }
  function longWeekLabel(iso) {
    if (!iso) return '';
    var p = iso.split('-'); if (p.length < 3) return iso;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return parseInt(p[2], 10) + ' ' + months[parseInt(p[1],10)-1] + ' ' + p[0];
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c];
    });
  }

  function renderProjectHTUDailyChart(daily) {
    var svg = document.getElementById('proj-htu-daily-chart');
    if (!svg || !daily || !daily.length) return;
    var W = 600, H = 110, PAD = 6;
    var n = daily.length;
    var maxV = 0;
    daily.forEach(function(d) { if (d.wdi > maxV) maxV = d.wdi; });
    if (maxV === 0) maxV = 1;
    var slot = (W - 2 * PAD) / n;
    var barW = slot - 2;
    if (barW < 2) barW = 2;
    var bars = '';
    daily.forEach(function(d, i) {
      var h = (d.wdi / maxV) * (H - 2 * PAD);
      var x = PAD + i * slot;
      var y = H - PAD - h;
      bars += '<rect class="proj-bar" data-idx="' + i + '" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + h.toFixed(1) + '" fill="#85B7EB"/>';
    });
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.innerHTML = bars;

    var totalWdi = daily.reduce(function(s, d) { return s + d.wdi; }, 0);
    var avgWdi = (totalWdi / n).toFixed(1);
    var firstDay = projFmtDate(daily[0].date);
    var lastDay = projFmtDate(daily[daily.length - 1].date);
    document.getElementById('proj-htu-daily-summary').textContent =
      firstDay + ' \u2192 ' + lastDay + ' \u00b7 avg ' + avgWdi + ' WDI/day';

    // Hover tooltip
    var tooltip = document.getElementById('proj-htu-daily-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'proj-htu-daily-tooltip';
      tooltip.className = 'proj-chart-tooltip';
      svg.parentNode.appendChild(tooltip);
    }
    var bars_els = svg.querySelectorAll('.proj-bar');
    bars_els.forEach(function(rect) {
      rect.addEventListener('mouseenter', function(e) {
        var idx = parseInt(rect.getAttribute('data-idx'), 10);
        var d = daily[idx];
        if (!d) return;
        rect.setAttribute('fill', '#378ADD');
        tooltip.innerHTML =
          '<div class="proj-tip-date">' + projFmtDate(d.date) + '</div>' +
          '<div class="proj-tip-row"><span>WDI</span><span>' + d.wdi.toFixed(1) + '</span></div>' +
          '<div class="proj-tip-row"><span>Joints</span><span>' + d.joints + '</span></div>';
        tooltip.style.display = 'block';
      });
      rect.addEventListener('mouseleave', function() {
        rect.setAttribute('fill', '#85B7EB');
        tooltip.style.display = 'none';
      });
    });

    // Position the tooltip relative to the chart container
    var chartContainer = svg.parentNode;
    chartContainer.addEventListener('mousemove', function(e) {
      if (tooltip.style.display !== 'block') return;
      var rect = chartContainer.getBoundingClientRect();
      var x = e.clientX - rect.left + 12;
      var y = e.clientY - rect.top - 8;
      // Keep within container bounds
      var tipW = tooltip.offsetWidth;
      if (x + tipW > rect.width) x = e.clientX - rect.left - tipW - 12;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    });
  }

  var projectsInited = false;

  // ===== OSBL project (United Refinery — weekly progress report) =====
  // Different from HTU: we only supply welders to this project, no NDT or
  // welder performance tracking. Just zone-level WDI scope vs completed.
  // Data source is the General sheet of the WPR-XX weekly export.
  var PROJECT_OSBL = {"project": "OSBL", "project_name": "OSBL â€” United Refinery", "report_no": "WR-019", "report_date": "2026-05-24", "total": {"total_wdi": 45750.0, "completed_wdi": 21062.0, "completion_pct": 46.0}, "zones": [{"name": "Main Rack-01 Piping Works", "total_wdi": 1556.25, "completed_wdi": 1558.0, "completion_pct": 100.1, "balance_wdi": -1.75}, {"name": "Inner Tank Farm-03", "total_wdi": 3712.0, "completed_wdi": 3677.0, "completion_pct": 99.1, "balance_wdi": 35.0}, {"name": "Inner Tank Farm-04", "total_wdi": 3996.0, "completed_wdi": 3721.0, "completion_pct": 93.1, "balance_wdi": 275.0}, {"name": "Inner Tank Farm-02", "total_wdi": 7170.0, "completed_wdi": 6132.0, "completion_pct": 85.5, "balance_wdi": 1038.0}, {"name": "Main Rack-02 Piping Works", "total_wdi": 3548.25, "completed_wdi": 2884.0, "completion_pct": 81.3, "balance_wdi": 664.25}, {"name": "un Loading Area Piping Works", "total_wdi": 623.0, "completed_wdi": 316.0, "completion_pct": 50.7, "balance_wdi": 307.0}, {"name": "Loading Area Piping Works", "total_wdi": 2250.5, "completed_wdi": 765.0, "completion_pct": 34.0, "balance_wdi": 1485.5}, {"name": "Inner Tank Farm-01", "total_wdi": 3394.25, "completed_wdi": 778.0, "completion_pct": 22.9, "balance_wdi": 2616.25}, {"name": "Main Rack-03 Piping Works", "total_wdi": 275.0, "completed_wdi": 26.0, "completion_pct": 9.5, "balance_wdi": 249.0}, {"name": "Interconnection", "total_wdi": 19224.75, "completed_wdi": 825.0, "completion_pct": 4.3, "balance_wdi": 18399.75}]};

  function renderProjectOSBL() {
    var data = PROJECT_OSBL;
    if (!data) return;

    var dateEl = document.getElementById('proj-osbl-tab-date');
    if (dateEl) dateEl.textContent = '(last updated: ' + projFmtDate(data.report_date) + ')';

    var t = data.total;
    var totalDone = t.completed_wdi || 0;
    var totalScope = t.total_wdi || 0;
    if (totalDone > totalScope) totalScope = totalDone;
    var totalBalance = Math.max(0, totalScope - totalDone);
    var pct = (totalScope > 0) ? Math.min(100, totalDone / totalScope * 100) : 0;
    document.getElementById('proj-osbl-overall-pct').textContent = pct.toFixed(1) + '%';
    document.getElementById('proj-osbl-overall-bar').style.width = pct.toFixed(2) + '%';
    document.getElementById('proj-osbl-overall-completed').textContent = projFmtNum(Math.round(totalDone)) + ' WDI';
    document.getElementById('proj-osbl-overall-balance').textContent = projFmtNum(Math.round(totalBalance)) + ' WDI';
    document.getElementById('proj-osbl-overall-total').textContent = projFmtNum(Math.round(totalScope)) + ' WDI';
    document.getElementById('proj-osbl-overall-sub').textContent = data.zones.length + ' zones';

    var grid = document.getElementById('proj-osbl-zones-grid');
    var html = '';
    // Sort zones by completion % descending — most done first
    var sortedZones = data.zones.slice().sort(function(a, b) {
      return b.completion_pct - a.completion_pct;
    });
    sortedZones.forEach(function(z) {
      var done = z.completed_wdi || 0;
      var scope = z.total_wdi || 0;
      // If actual welded exceeds the planned scope, treat scope as = done
      // (cap progress at 100%, no negative balance shown)
      if (done > scope) scope = done;
      var remaining = Math.max(0, scope - done);
      var zPct = (scope > 0) ? Math.min(100, done / scope * 100) : 0;
      var barW = zPct.toFixed(2);
      html +=
        '<div class="proj-osbl-zone-card">' +
          '<div class="proj-osbl-zone-header">' +
            '<div class="proj-osbl-zone-name">' + z.name + '</div>' +
            '<div class="proj-osbl-zone-pct">' + zPct.toFixed(1) + '%</div>' +
          '</div>' +
          '<div class="proj-osbl-zone-bar-wrap"><div class="proj-osbl-zone-bar-fill" style="width: ' + barW + '%;"></div></div>' +
          '<div class="proj-osbl-zone-numbers">' +
            '<span><strong>' + projFmtNum(Math.round(done)) + '</strong> done</span>' +
            '<span><strong>' + projFmtNum(Math.round(remaining)) + '</strong> remaining</span>' +
            '<span>of ' + projFmtNum(Math.round(scope)) + '</span>' +
          '</div>' +
        '</div>';
    });
    grid.innerHTML = html;
    document.getElementById('proj-osbl-zones-count').textContent = data.zones.length + ' zones · sorted by % complete';
  }


  // ===== Torque calculator =====
  // Reference: KM-P-MNT-016 Rev 2.0 Appendix C (Khor Mor flange management)
  // All values: 70% yield, lubricant CoF = 0.15 (KOPR-KOTE or equiv),
  // outer-ring reinforced spiral wound gasket assumption.
  // For other gaskets / lubricants / friction factors, recompute per ASME PCC-1.
  var TQ_SIZES = [
    { key: '1/2',   label: '1/2"',   in: 0.500 },
    { key: '5/8',   label: '5/8"',   in: 0.625 },
    { key: '3/4',   label: '3/4"',   in: 0.750 },
    { key: '7/8',   label: '7/8"',   in: 0.875 },
    { key: '1',     label: '1"',     in: 1.000 },
    { key: '1-1/8', label: '1-1/8"', in: 1.125 },
    { key: '1-1/4', label: '1-1/4"', in: 1.250 },
    { key: '1-3/8', label: '1-3/8"', in: 1.375 },
    { key: '1-1/2', label: '1-1/2"', in: 1.500 },
    { key: '1-5/8', label: '1-5/8"', in: 1.625 },
    { key: '1-3/4', label: '1-3/4"', in: 1.750 },
    { key: '1-7/8', label: '1-7/8"', in: 1.875 },
    { key: '2',     label: '2"',     in: 2.000 },
    { key: '2-1/4', label: '2-1/4"', in: 2.250 },
    { key: '2-1/2', label: '2-1/2"', in: 2.500 },
    { key: '2-3/4', label: '2-3/4"', in: 2.750 },
    { key: '3',     label: '3"',     in: 3.000 },
    { key: '3-1/8', label: '3-1/8"', in: 3.125 },
    { key: '3-1/2', label: '3-1/2"', in: 3.500 },
    { key: '4',     label: '4"',     in: 4.000 }
  ];
  // Torque values stored in ft-lb internally (as published in the procedure
  // Appendix C tables); UI converts and displays in N·m only.
  // B7, B16, L7 share identical values per Appendix C.
  var TQ_VALUES = {
    'B7': {
      '1/2':65,'5/8':130,'3/4':230,'7/8':371,'1':556,'1-1/8':817,'1-1/4':1148,
      '1-3/8':1557,'1-1/2':2055,'1-5/8':2648,'1-3/4':3346,'1-7/8':4157,
      '2':5088,'2-1/4':7350,'2-1/2':9227,'2-3/4':12395,'3':16217,
      '3-1/8':18392,'3-1/2':26064,'4':39258
    },
    'B7M': {
      '1/2':50,'5/8':99,'3/4':176,'7/8':283,'1':424,'1-1/8':622,'1-1/4':874,
      '1-3/8':1187,'1-1/2':1566,'1-5/8':2018,'1-3/4':2549,'1-7/8':3167,
      '2':3877,'2-1/4':5600,'2-1/2':7700,'2-3/4':10438,'3':13656,
      '3-1/8':15488,'3-1/2':21949,'4':33059
    },
    'B16': null,  // same as B7 — set below
    'L7':  null,  // same as B7
    'B8C2': {
      '1/2':62,'5/8':124,'3/4':219,'7/8':283,'1':424,'1-1/8':506,'1-1/4':710,
      '1-3/8':742,'1-1/2':979
      // procedure does not list values above 1-1/2" for B8/B8M Class 2;
      // these grades are typically not used for high-strength service.
    },
    'B8MC2': {
      '1/2':59,'5/8':117,'3/4':208,'7/8':283,'1':424,'1-1/8':506,'1-1/4':710,
      '1-3/8':742,'1-1/2':979
    }
  };
  TQ_VALUES['B16'] = TQ_VALUES['B7'];
  TQ_VALUES['L7']  = TQ_VALUES['B7'];

  var TQ_MATERIAL_LABELS = {
    'B7':    'A193 Gr. B7',
    'B7M':   'A193 Gr. B7M',
    'B16':   'A193 Gr. B16',
    'L7':    'A320 Gr. L7',
    'B8C2':  'A320 Gr. B8 Cl.2',
    'B8MC2': 'A320 Gr. B8M Cl.2'
  };

  // Diametrically opposed cross-pattern sequences from procedure Figure 1.
  // Each entry is the bolt index (1-based) at the n-th step of tightening.
  // Position 1 is at the 9 o'clock (left) of the flange face.
  var TQ_SEQUENCES = {
    4:  [1, 2, 3, 4],
    8:  [1, 2, 3, 4, 5, 6, 7, 8],
    12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    16: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    20: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    24: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    28: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    32: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
  };
  // (The sequence is computed mathematically below — these placeholders are
  // overwritten on init to match the procedure's diametric cross pattern.)

  // Hardcoded sequences from KM-P-MNT-016 Rev 2.0 Figure 1 (and standard
  // ASME PCC-1 Annex F for sizes the procedure shows). Each array is the
  // tightening order: 1st bolt to tighten, 2nd bolt, ... For position labeling
  // we invert this into "label per position" via tqBuildCrossSequence.
  var TQ_HARDCODED_SEQUENCES = {
    4:  [1, 3, 2, 4],
    8:  [1, 5, 3, 7, 2, 6, 4, 8],
    12: [1, 7, 4, 10, 2, 8, 5, 11, 3, 9, 6, 12],
    16: [1, 9, 5, 13, 3, 11, 7, 15, 2, 10, 6, 14, 4, 12, 8, 16],
    20: [1, 11, 6, 16, 3, 13, 8, 18, 5, 15, 10, 20, 2, 12, 7, 17, 4, 14, 9, 19],
    24: [1, 13, 7, 19, 4, 16, 10, 22, 2, 14, 8, 20, 5, 17, 11, 23, 3, 15, 9, 21, 6, 18, 12, 24],
    28: [1, 15, 8, 22, 4, 18, 11, 25, 6, 20, 13, 27, 2, 16, 9, 23, 5, 19, 12, 26, 7, 21, 14, 28, 3, 17, 10, 24],
    32: [1, 17, 9, 25, 5, 21, 13, 29, 3, 19, 11, 27, 7, 23, 15, 31, 2, 18, 10, 26, 6, 22, 14, 30, 4, 20, 12, 28, 8, 24, 16, 32]
  };

  function tqBuildCrossSequence(n) {
    // Returns labels[positionIdx] = step at which that bolt position is tightened.
    // Positions are 0..n-1 going clockwise, with position 0 at 9 o'clock (left).
    // Bolt numbering in TQ_HARDCODED_SEQUENCES is 1-based per Figure 1 layout.
    var hard = TQ_HARDCODED_SEQUENCES[n];
    if (!hard) return [];
    var labels = new Array(n);
    // hard[i] is the bolt NUMBER tightened at step i+1.
    // Bolt number k corresponds to position (k-1) when numbering is the same
    // as positions. Figure 1 numbers bolts 1..n going clockwise from left,
    // matching our position scheme (pos 0 = bolt 1, pos 1 = bolt 2, ...).
    for (var step = 0; step < n; step++) {
      var boltNum = hard[step];
      var positionIdx = boltNum - 1;
      labels[positionIdx] = step + 1;
    }
    return labels;
  }

  function tqGetTorque(material, sizeKey) {
    var table = TQ_VALUES[material];
    if (!table) return null;
    var v = table[sizeKey];
    return (v != null) ? v : null;
  }

  function tqDecideMethod(nmFull) {
    // Decision based on actual torque value:
    //  ≤ 678 N·m  → manual torque wrench
    //  679 – 5000 N·m → hydraulic torque wrench (site capability)
    //  > 5000 N·m → tension (hydraulic tensioner required)
    if (nmFull == null || isNaN(nmFull)) {
      return { primary: '—', sub: '' };
    }
    if (nmFull <= 678) {
      return { primary: 'Manual torque', sub: 'manual torque wrench (≤ 678 N·m)' };
    }
    if (nmFull <= 5000) {
      return { primary: 'Hydraulic torque', sub: 'site hydraulic torque wrench (up to 5,000 N·m)' };
    }
    return { primary: 'Tension', sub: 'exceeds 5,000 N·m — hydraulic tensioner required' };
  }

  function tqPopulateSizes() {
    var sel = document.getElementById('tq-size');
    if (!sel) return;
    sel.innerHTML = '';
    TQ_SIZES.forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s.key;
      opt.textContent = s.label;
      sel.appendChild(opt);
    });
    // Default 7/8"
    sel.value = '7/8';
  }

  // ASME B16.5 bolt count by NPS and Class. Key = NPS in inches.
  // Source: ASME B16.5-2020 Tables 8 (Class 150), 9 (300), 11 (600),
  // 13 (900), 15 (1500), 17 (2500). Values for sizes 1/2"–24".
  // Where the standard does not list a flange (e.g., very small sizes at
  // higher classes), values fall back to the closest published combination.
  var TQ_FLANGE_BOLTS = {
    //         150 300 600 900 1500 2500
    '0.5':   [  4,  4,  4,  4,  4,   4 ],
    '0.75':  [  4,  4,  4,  4,  4,   4 ],
    '1':     [  4,  4,  4,  4,  4,   4 ],
    '1.25':  [  4,  4,  4,  4,  4,   4 ],
    '1.5':   [  4,  4,  4,  4,  4,   4 ],
    '2':     [  4,  8,  8,  8,  8,   8 ],
    '2.5':   [  4,  8,  8,  8,  8,   8 ],
    '3':     [  4,  8,  8,  8,  8,   8 ],
    '3.5':   [  8,  8,  8,  8,  8,   8 ],
    '4':     [  8,  8,  8,  8,  8,   8 ],
    '5':     [  8,  8,  8,  8,  8,   8 ],
    '6':     [  8, 12, 12, 12, 12,   8 ],
    '8':     [  8, 12, 12, 12, 12,  12 ],
    '10':    [ 12, 16, 16, 16, 12,  12 ],
    '12':    [ 12, 16, 20, 20, 16,  12 ],
    '14':    [ 12, 20, 20, 20, 16,  12 ],
    '16':    [ 16, 20, 20, 20, 16,  16 ],
    '18':    [ 16, 24, 20, 20, 16,  16 ],
    '20':    [ 20, 24, 24, 20, 16,  16 ],
    '22':    [ 20, 24, 24, 20, 16,  16 ],
    '24':    [ 20, 24, 24, 20, 16,  16 ]
  };
  var TQ_CLASS_INDEX = { '150': 0, '300': 1, '600': 2, '900': 3, '1500': 4, '2500': 5 };

  // Display labels for NPS keys (fractional formatting)
  var TQ_FLANGE_NPS_LIST = [
    { key: '0.5',  label: '1/2"'   },
    { key: '0.75', label: '3/4"'   },
    { key: '1',    label: '1"'     },
    { key: '1.25', label: '1-1/4"' },
    { key: '1.5',  label: '1-1/2"' },
    { key: '2',    label: '2"'     },
    { key: '2.5',  label: '2-1/2"' },
    { key: '3',    label: '3"'     },
    { key: '3.5',  label: '3-1/2"' },
    { key: '4',    label: '4"'     },
    { key: '5',    label: '5"'     },
    { key: '6',    label: '6"'     },
    { key: '8',    label: '8"'     },
    { key: '10',   label: '10"'    },
    { key: '12',   label: '12"'    },
    { key: '14',   label: '14"'    },
    { key: '16',   label: '16"'    },
    { key: '18',   label: '18"'    },
    { key: '20',   label: '20"'    },
    { key: '22',   label: '22"'    },
    { key: '24',   label: '24"'    }
  ];

  function tqPopulateFlangeNps() {
    var sel = document.getElementById('tq-flange-nps');
    if (!sel) return;
    sel.innerHTML = '';
    TQ_FLANGE_NPS_LIST.forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s.key;
      opt.textContent = s.label;
      sel.appendChild(opt);
    });
    sel.value = '6'; // default 6"
  }

  function tqLookupBoltCount(npsKey, classKey) {
    var row = TQ_FLANGE_BOLTS[npsKey];
    if (!row) return null;
    var idx = TQ_CLASS_INDEX[classKey];
    if (idx == null) return null;
    return row[idx] || null;
  }

  function tqAutoFillBoltCount() {
    var npsSel = document.getElementById('tq-flange-nps');
    var clsSel = document.getElementById('tq-flange-class');
    var countSel = document.getElementById('tq-bolt-count');
    if (!npsSel || !clsSel || !countSel) return;
    var n = tqLookupBoltCount(npsSel.value, clsSel.value);
    if (n != null) {
      // Snap to a value the dropdown supports (4, 8, 12, ..., 32)
      var supported = [4, 8, 12, 16, 20, 24, 28, 32];
      var nearest = supported.reduce(function(prev, curr) {
        return Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev;
      });
      countSel.value = String(nearest);
      tqRenderDiagram();
    }
  }

  function tqRender() {
    var matSel = document.getElementById('tq-material');
    var sizeSel = document.getElementById('tq-size');
    var lubSel = document.getElementById('tq-lubricant');
    if (!matSel || !sizeSel) return;
    var material = matSel.value;
    var sizeKey = sizeSel.value;
    var sizeRow = TQ_SIZES.find(function(s) { return s.key === sizeKey; });
    var ftlb = tqGetTorque(material, sizeKey);
    // Procedure values are based on CoF 0.15. Other lubricants scale linearly
    // (within the simple uniform-thread model): Torque ∝ CoF.
    var cof = lubSel ? parseFloat(lubSel.value) : 0.15;
    var cofFactor = cof / 0.15;

    var nmEl  = document.getElementById('tq-nm');
    var s1El  = document.getElementById('tq-stage1');
    var s2El  = document.getElementById('tq-stage2');
    var s3El  = document.getElementById('tq-stage3');

    if (ftlb == null) {
      nmEl.textContent = '—';
      s1El.textContent = '—';
      s2El.textContent = '—';
      s3El.textContent = '—';
      nmEl.parentElement.querySelector('.tq-result-unit').textContent = 'not in procedure for this material/size';
    } else {
      var nmFull = ftlb * 1.355818 * cofFactor;
      nmEl.textContent = Math.round(nmFull).toLocaleString('en-US');
      var unitText = 'N·m';
      if (cofFactor !== 1) unitText += ' (CoF ' + cof.toFixed(2) + ' adj.)';
      nmEl.parentElement.querySelector('.tq-result-unit').textContent = unitText;
      s1El.textContent = Math.round(nmFull * 0.30).toLocaleString('en-US') + ' N·m';
      s2El.textContent = Math.round(nmFull * 0.60).toLocaleString('en-US') + ' N·m';
      s3El.textContent = Math.round(nmFull).toLocaleString('en-US') + ' N·m';
    }

    var method = (ftlb != null) ? tqDecideMethod(ftlb * 1.355818 * cofFactor) : { primary: '—', sub: '' };
    document.getElementById('tq-method').textContent = method.primary;
    document.getElementById('tq-method-sub').textContent = method.sub;

    tqRenderRefTable(cofFactor);
  }

  function tqRenderRefTable(cofFactor) {
    var table = document.getElementById('tq-ref-table');
    if (!table) return;
    var materials = ['B7', 'B7M', 'B16', 'L7', 'B8C2', 'B8MC2'];
    var matLabels = {
      'B7': 'B7', 'B7M': 'B7M', 'B16': 'B16', 'L7': 'L7',
      'B8C2': 'B8 Cl.2', 'B8MC2': 'B8M Cl.2'
    };

    var html = '<thead><tr><th class="tq-ref-size">Size</th>';
    materials.forEach(function(m) { html += '<th>' + matLabels[m] + '</th>'; });
    html += '</tr></thead><tbody>';

    TQ_SIZES.forEach(function(s) {
      html += '<tr><td class="tq-ref-size">' + s.label + '</td>';
      materials.forEach(function(m) {
        var ftlb = tqGetTorque(m, s.key);
        if (ftlb == null) {
          html += '<td class="tq-ref-na">—</td>';
        } else {
          var nm = Math.round(ftlb * 1.355818 * cofFactor);
          html += '<td>' + nm.toLocaleString('en-US') + '</td>';
        }
      });
      html += '</tr>';
    });
    html += '</tbody>';
    table.innerHTML = html;
  }

  function tqRenderDiagram() {
    var sel = document.getElementById('tq-bolt-count');
    var svg = document.getElementById('tq-diagram');
    if (!sel || !svg) return;
    var n = parseInt(sel.value, 10);
    var labels = tqBuildCrossSequence(n);

    var W = 400, H = 400;
    var cx = W / 2, cy = H / 2;
    var Router = 175;        // outer flange edge
    var Rinner = 110;        // inner bore
    var Rbolts = 145;        // bolt circle radius
    var rBolt = Math.max(12, Math.min(20, Math.PI * Rbolts / n - 2));

    var html = '';
    // Outer + inner flange circles
    html += '<circle class="tq-flange-circle" cx="' + cx + '" cy="' + cy + '" r="' + Router + '"/>';
    html += '<circle class="tq-flange-circle" cx="' + cx + '" cy="' + cy + '" r="' + Rinner + '"/>';
    // Bolts: position 0 at 9 o'clock (left), going clockwise.
    // Angle for bolt i: 180° + i * (360/n), measured CCW from positive x-axis.
    // SVG y is down, so we use sin/cos with y inverted.
    for (var i = 0; i < n; i++) {
      var angleDeg = 180 + (i * 360 / n);
      var rad = angleDeg * Math.PI / 180;
      var bx = cx + Rbolts * Math.cos(rad);
      var by = cy + Rbolts * Math.sin(rad);
      html += '<circle class="tq-bolt" cx="' + bx.toFixed(1) + '" cy="' + by.toFixed(1) + '" r="' + rBolt + '"/>';
      html += '<text class="tq-bolt-num" x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '">' + labels[i] + '</text>';
    }
    svg.innerHTML = html;
  }

  var torqueInited = false;
  function initTorque() {
    if (torqueInited) {
      tqRender();
      tqRenderDiagram();
      return;
    }
    torqueInited = true;
    tqPopulateSizes();
    tqPopulateFlangeNps();

    document.getElementById('tq-material').addEventListener('change', tqRender);
    document.getElementById('tq-size').addEventListener('change', tqRender);
    document.getElementById('tq-lubricant').addEventListener('change', tqRender);
    document.getElementById('tq-bolt-count').addEventListener('change', tqRenderDiagram);
    document.getElementById('tq-flange-nps').addEventListener('change', tqAutoFillBoltCount);
    document.getElementById('tq-flange-class').addEventListener('change', tqAutoFillBoltCount);

    tqRender();
    tqAutoFillBoltCount();
  }


  function initProjects() {
    if (projectsInited) return;
    projectsInited = true;
    renderProjectHTU();
    renderProjectOSBL();
  }

  // Subpages (welders.html, projects.html) start with a non-default tab marked
  // .active, so the click handler that triggers init never fires. Run init for
  // whichever tab is active at load time.
  var activeOnLoad = document.querySelector('.tab.active');
  if (activeOnLoad) {
    var initName = activeOnLoad.getAttribute('data-tab');
    if (initName === 'welders') initWelders();
    if (initName === 'projects') initProjects();
    if (initName === 'heatinput') initHeatInput();
    if (initName === 'ceph') initCePh();
    if (initName === 'torque') initTorque();
  }

})();
